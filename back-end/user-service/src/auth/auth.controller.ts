import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';

import type { Response } from 'express';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authService.login(body);

        response.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return {
            sucesso: result.data,
            token: result.accessToken
        };
    }

    @Post('refresh')
    refresh(@Req() req) {
        const token = req.cookies.refresh_token;

        if (!token) {
            throw new UnauthorizedException();
        }

        const payload = this.authService.verifyRefresh(token);

        const newAccessToken = this.authService.generateAccessToken(payload.sub);

        return {
            token: newAccessToken,
        };
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('refresh_token');

        return { message: 'Logout realizado com sucesso' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req) {
        const user = await this.authService.getMe(req.user.id);

        return { user };
    }
}