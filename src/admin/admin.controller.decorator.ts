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
      okRes: {
        type: GetStoreTokenResponseDto,
      },
    }),
  );
