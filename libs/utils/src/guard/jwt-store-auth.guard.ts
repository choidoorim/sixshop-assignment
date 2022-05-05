import {
  applyDecorators,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class JwtStoreAuthGuard extends AuthGuard('jwt-store') {
  handleRequest<TUser>(err: Error, user: TUser, info: Error) {
    if (err || info || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }
}

export const JwtStoreAuth = () =>
  applyDecorators(UseGuards(JwtStoreAuthGuard), ApiBearerAuth());
