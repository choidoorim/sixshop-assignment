import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuth } from './guard/local-auth.guard';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth' }), ApiTags('auth'));

export const CreateCustomer = () => applyDecorators(Post('/register'));

export const LoginCustomer = () => applyDecorators(Post('/login'), LocalAuth());
