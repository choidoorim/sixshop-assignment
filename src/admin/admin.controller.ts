import {
  AdminController as Controller,
  GetStoreId,
} from './admin.controller.decorator';
import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import { Get } from '@nestjs/common';
import { JwtStoreAuth } from "@app/utils/guard/jwt-store-auth.guard";

@Controller()
export class AdminController {
  @GetStoreId()
  getStoreId(@JwtToken() { adminId }: AdminJwtRequestDto) {
    return adminId;
  }

  @Get('test')
  @JwtStoreAuth()
  test() {
    return 'test';
  }
}
