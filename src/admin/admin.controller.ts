import {
  AdminController as Controller,
  GetAdmin,
} from './admin.controller.decorator';

import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import { AdminService } from './admin.service';
import { GetAdminResponseDto } from './dto/get-admin-response.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @GetAdmin()
  async getAdmin(@JwtToken() { adminId }: AdminJwtRequestDto) {
    const result = await this.adminService.getAdmin(adminId);
    return new GetAdminResponseDto(result);
  }
}
