import {
  applyDecorators,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt-admin') {
  handleRequest<TUser>(err: Error, user: TUser, info: Error) {
    if (err || info || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }
}

export const JwtAdminAuth = () =>
  applyDecorators(UseGuards(JwtAdminAuthGuard), ApiBearerAuth());
