import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDoc } from '@app/config/decorator';
import { JwtAdminAuth } from '@app/utils/guard';

import { GetStoreTokenResponseDto } from './dto';

export const AdminController = () =>
  applyDecorators(Controller({ path: 'admin' }), ApiTags('admin'));

export const GetStoreToken = () =>
  applyDecorators(
    Get('/store/token'),
    JwtAdminAuth(),
    ApiDoc({
      summary: '상점 Token 조회 API',
      description:
        '상점 Token 을 이용해서 기본적인 고객, 상점, 주문 기능을 사용할 수 있도록 했다',
      okRes: {
        type: GetStoreTokenResponseDto,
      },
    }),
  );
