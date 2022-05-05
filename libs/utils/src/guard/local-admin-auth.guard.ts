import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAdminAuthGuard extends AuthGuard('local-admin') {}

export const LocalAdminAuth = () =>
  applyDecorators(UseGuards(LocalAdminAuthGuard));
