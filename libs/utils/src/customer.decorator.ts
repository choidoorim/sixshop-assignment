import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CustomerJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    if (!user?.customerId) {
      throw new UnauthorizedException('권한이 없는 토큰입니다');
    }
    return data ? user?.[data] : user;
  },
);
