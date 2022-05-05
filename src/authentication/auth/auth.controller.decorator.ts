import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDoc } from '@app/config/decorator';
import { LocalAdminAuth } from '@app/utils/guard';

import { LoginAdminResponseDto } from './dto';

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
