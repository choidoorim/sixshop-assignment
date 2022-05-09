import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@app/utils/bcrypt';

import { AdminService } from '../../admin/admin.service';
import { CreateAdminRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly bcryptService: BcryptService,
  ) {}

  validateAdmin = async (email: string, password: string) => {
    const admin = await this.adminService.findAdminByEmail(email);
    if (admin && (await this.bcryptService.isMatch(admin.password, password))) {
      const { password, ...rest } = admin;
      return rest;
    }
    return null;
  };

  createAdmin = async (createAdminRequestDto: CreateAdminRequestDto) => {
    await this.adminService.createAdmin(createAdminRequestDto);

    return null;
  };

  login = async (adminId: string) => {
    const { id } = await this.adminService.getStore(adminId);
    const payload = { adminId, store: id };

    return this.jwtService.sign(payload);
  };
}
