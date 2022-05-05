import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local-store') {}

export const LocalAuth = () => applyDecorators(UseGuards(LocalAuthGuard));
