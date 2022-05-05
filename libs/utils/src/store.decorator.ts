import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@app/constants';

export const StoreJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    // 실수로 Customer JWT token 을 넣는 것을 방지
    if (!user.store || user.role !== Role.STORE) {
      throw new UnauthorizedException('잘못된 토큰입니다');
    }
    return data ? user?.[data] : user;
  },
);
