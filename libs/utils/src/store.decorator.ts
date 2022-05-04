import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const StoreJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    // 실수로 Customer JWT token 을 넣는 것을 방지
    if (!user?.store) {
      throw new UnauthorizedException('권한이 없는 토큰입니다');
    }
    return data ? user?.[data] : user;
  },
);
