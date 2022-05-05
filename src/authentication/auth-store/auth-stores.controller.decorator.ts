import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalStoreAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import {
  CreateStoreBodyRequestDto,
  LoginStoreResponseDto,
  LoginStoreRequestDto,
} from './dto';

export const AuthStoresController = () =>
  applyDecorators(Controller({ path: 'auth/stores' }), ApiTags('auth-stores'));

export const CreateStore = () =>
  applyDecorators(
    Post('/register'),
    ApiDoc({
      summary: 'Store 회원가입 API',
      createdRes: {
        description: 'Store 회원가입 성공',
        schema: {},
      },
      bodyOptions: { type: CreateStoreBodyRequestDto },
    }),
  );

export const LoginStore = () =>
  applyDecorators(
    Post('/login'),
    LocalStoreAuth(),
    ApiDoc({
      summary: 'Store 로그인 API',
      createdRes: {
        description: 'Store 로그인 성공',
        type: LoginStoreResponseDto,
      },
      bodyOptions: { type: LoginStoreRequestDto },
    }),
  );
