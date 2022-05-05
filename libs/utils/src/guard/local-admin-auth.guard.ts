import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAdminAuthGuard extends AuthGuard('local-customer') {}

export const LocalAdminAuth = () =>
  applyDecorators(UseGuards(LocalAdminAuthGuard));
