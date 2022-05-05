import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDoc } from '@app/config/decorator';
import { LocalAdminAuth } from '@app/utils/guard';

import { LoginAdminResponseDto, CreateAdminRequestDto } from './dto';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth' }), ApiTags('auth'));

export const LoginAdmin = () =>
  applyDecorators(
    Post('/login'),
    LocalAdminAuth(),
    ApiDoc({
      summary: 'admin login API',
      createdRes: {
        type: LoginAdminResponseDto,
      },
    }),
  );

export const CreateAdmin = () =>
  applyDecorators(
    Post('register'),
    ApiDoc({
      summary: 'admin 회원가입 API',
      createdRes: {
        schema: {},
      },
      bodyOptions: { type: CreateAdminRequestDto },
    }),
  );
