import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import {
  AdminController as Controller,
  GetStoreToken,
} from './admin.controller.decorator';
import { AdminService } from './admin.service';
import { GetStoreTokenResponseDto } from './dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @GetStoreToken()
  async getStoreId(@JwtToken() { adminId }: AdminJwtRequestDto) {
    return new GetStoreTokenResponseDto({
      token: await this.adminService.getStoreToken(adminId),
    });
  }
}
