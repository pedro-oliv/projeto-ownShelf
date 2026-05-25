import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: RegisterDto) {
        const emailExists = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (emailExists) {
            throw new ConflictException(
                'Email já cadastrado',
            );
        }

        const hashedPassword = await bcrypt.hash(
            data.senha,
            10,
        );

        const user = await this.prisma.user.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedPassword,
            },
        });

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });

        return {
            sucesso: {
                dados: {
                    token,
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                    },
                },
                message: 'Conta criada com sucesso!'
            }
        };
    }

    async login(data: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new UnauthorizedException(
                'O email ou a senha estão incorretos.',
            );
        }

        const passwordMatch = await bcrypt.compare(
            data.senha,
            user.senha,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException(
                'O email ou a senha estão incorretos.',
            );
        }

        const accessToken = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
            },
            { expiresIn: '15m' },
        );

        const refreshToken = this.jwtService.sign(
            {
                sub: user.id,
            },
            { expiresIn: '7d' },
        );

        return {
            data: {
                dados: {
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                    },
                    message: "Login efetuado com sucesso!",
                },
            },
            accessToken,
            refreshToken
        };
    }

    async getMe(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
        };
    }

    verifyRefresh(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Refresh token inválido');
        }
    }

    generateAccessToken(userId: number, email?: string) {
        return this.jwtService.sign(
            {
                sub: userId,
                email,
            },
            {
                expiresIn: '15m',
            },
        );
    }
}