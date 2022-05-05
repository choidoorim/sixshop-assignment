import { Req } from '@nestjs/common';

import {
  AuthController as Controller,
  LoginAdmin,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { IAdminInterface } from './type';
import { LoginAdminResponseDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @LoginAdmin()
  loginAdmin(@Req() { user }: { user: IAdminInterface }) {
    return new LoginAdminResponseDto({
      accessToken: this.authService.login(user.adminId),
    });
  }
}
