import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ClientProxy } from '@nestjs/microservices';



@Injectable()
export class TransactionsService {
    constructor(
        private readonly prisma: PrismaService,

    ) { }

    async create(dto: CreateTransactionDto) {
        const total = dto.items.reduce(
            (acc, item) => acc + item.unitPrice,
            0,
        );

        return this.prisma.transaction.create({
            data: {
                userId: dto.userId,
                paymentType: dto.paymentType,
                totalAmount: total,

                items: {
                    create: dto.items.map(item => ({
                        bookId: item.bookId,
                        unitPrice: item.unitPrice,
                    })),
                },
            },

            include: {
                items: true,
            },
        });
    }

    async findAll() {
        return this.prisma.transaction.findMany({
            include: {
                items: true,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findByUser(userId: string) {
        return this.prisma.transaction.findMany({
            where: {
                userId,
            },

            include: {
                items: true,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.transaction.findUnique({
            where: {
                id,
            },

            include: {
                items: true,
            },
        });
    }

    async updateStatus(
        id: string,
        status: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED',
    ) {
        const transaction =
            await this.prisma.transaction.update({
                where: {
                    id,
                },

                data: {
                    status,
                },

            });

        return transaction;
    }
}
