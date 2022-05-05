import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDoc } from '@app/config/decorator';
import { JwtAdminAuth } from '@app/utils/guard';

import { GetStoreIdResponseDto } from './dto';

export const AdminController = () =>
  applyDecorators(Controller({ path: 'admin' }), ApiTags('store'));

export const GetStoreId = () =>
  applyDecorators(
    Get('store'),
    JwtAdminAuth(),
    ApiDoc({
      summary: '상점 ID 조회 API',
      okRes: {
        type: GetStoreIdResponseDto,
      },
    }),
  );
