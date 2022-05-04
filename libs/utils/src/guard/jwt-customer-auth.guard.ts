import {
  applyDecorators,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class JwtCustomerAuthGuard extends AuthGuard('jwt-customer') {
  handleRequest<TUser>(err: Error, user: TUser, info: Error) {
    if (err || info || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }
}

export const JwtCustomerAuth = () =>
  applyDecorators(UseGuards(JwtCustomerAuthGuard), ApiBearerAuth());
