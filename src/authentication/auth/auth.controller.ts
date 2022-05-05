import { Req, Body } from '@nestjs/common';

import {
  AuthController as Controller,
  CreateAdmin,
  LoginAdmin,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { IAdminInterface } from './type';
import { CreateAdminRequestDto, LoginAdminResponseDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateAdmin()
  createAdmin(@Body() createAdminRequestDto: CreateAdminRequestDto) {
    return this.authService.createAdmin(createAdminRequestDto);
  }

  @LoginAdmin()
  loginAdmin(@Req() { user }: { user: IAdminInterface }) {
    return new LoginAdminResponseDto({
      accessToken: this.authService.login(user.adminId),
    });
  }
}
