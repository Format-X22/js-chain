import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
    AuthChangePasswordDto,
    AuthRegisterDto,
    AuthRegisterResponseDto,
    AuthSignInDto,
    AuthSignInResponseDto,
    TAuthHeaders,
} from './auth.dto';
import { CheckAuth } from './auth.guard';
import { OkResult, TOkResult } from '../api.dto';

// TODO Optional on/off from .env
// TODO Reset password
@ApiTags('Current node auth api')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() body: AuthRegisterDto): Promise<AuthRegisterResponseDto> {
        return await this.authService.register(body);
    }

    @Post('change-password')
    async changePassword(@Body() body: AuthChangePasswordDto): Promise<TOkResult> {
        await this.authService.changePassword(body);

        return OkResult;
    }

    @Post('sign-in')
    async signIn(@Body() body: AuthSignInDto): Promise<AuthSignInResponseDto> {
        return await this.authService.signIn(body);
    }

    @CheckAuth()
    @Post('sign-out')
    async signOut(@Headers() headers: TAuthHeaders): Promise<TOkResult> {
        await this.authService.signOut(headers);

        return OkResult;
    }
}
