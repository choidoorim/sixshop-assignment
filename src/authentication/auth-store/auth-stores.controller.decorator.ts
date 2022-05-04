import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AuthStoresController = () =>
  applyDecorators(Controller({ path: 'auth/stores' }), ApiTags('auth-stores'));

export const CreateStore = () => applyDecorators(Post('/register'));
