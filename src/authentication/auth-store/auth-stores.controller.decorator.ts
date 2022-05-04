import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalStoreAuth } from '@app/utils/guard';

export const AuthStoresController = () =>
  applyDecorators(Controller({ path: 'auth/stores' }), ApiTags('auth-stores'));

export const CreateStore = () => applyDecorators(Post('/register'));

export const LoginStore = () =>
  applyDecorators(Post('/login'), LocalStoreAuth());
