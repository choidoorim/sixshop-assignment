import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtTokenAuth } from '@app/utils/guard/jwt-token-auth.guard';

export const CustomersController = () =>
  applyDecorators(Controller({ path: 'customers' }), ApiTags('customers'));

export const CreateCustomer = () => applyDecorators(Post(), JwtTokenAuth());
