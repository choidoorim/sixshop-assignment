import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth' }), ApiTags('auth'));

export const CreateCustomer = () => applyDecorators(Post('/register'));
