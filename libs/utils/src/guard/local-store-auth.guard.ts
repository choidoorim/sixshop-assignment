import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalStoreAuthGuard extends AuthGuard('local-store') {}

export const LocalStoreAuth = () =>
  applyDecorators(UseGuards(LocalStoreAuthGuard));
