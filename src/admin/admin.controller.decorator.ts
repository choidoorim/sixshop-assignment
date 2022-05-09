import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAdminAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import { GetAdminResponseDto } from './dto';

export const AdminController = () =>
  applyDecorators(Controller({ path: 'admin' }), ApiTags('admin'));

export const GetAdmin = () =>
  applyDecorators(
    Get(),
    JwtAdminAuth(),
    ApiDoc({
      summary: 'Admin 정보 조회',
      okRes: {
        type: GetAdminResponseDto,
      },
    }),
  );
