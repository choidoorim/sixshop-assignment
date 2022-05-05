import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@app/constants';

export const CustomerJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    if (!user.customerId || user.role !== Role.CUSTOMER) {
      throw new UnauthorizedException('잘못된 토큰입니다');
    }
    return data ? user?.[data] : user;
  },
);
