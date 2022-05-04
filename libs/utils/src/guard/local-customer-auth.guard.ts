import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalCustomerAuthGuard extends AuthGuard('local-customer') {}

export const LocalCustomerAuth = () =>
  applyDecorators(UseGuards(LocalCustomerAuthGuard));
