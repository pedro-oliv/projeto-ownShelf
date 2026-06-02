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

    async unlockTransaction(transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
        where: { id: transactionId },
        include: { items: true },
    });

    if (!transaction) throw new Error('Transação não encontrada.');

    if (transaction.status !== 'PENDING') {
        throw new Error('Já processado.');
    }

    const books = transaction.items.map(i => i.bookId);

    try {
        const response = await fetch(
            'http://localhost:3002/library/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: transaction.userId,
                    books,
                    transactionId: transaction.id,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('BOOK SERVICE ERROR:', errorText);
            throw new Error(errorText);
        }

        
        await this.updateStatus(transactionId, 'PAID');

        return {
            success: true,
        };

    } catch (err) {
        console.log('UNLOCK FAILED:');

        
        throw new Error('Falha ao liberar livros para biblioteca.');
    }
}
}
