import { Body, Get, Req } from '@nestjs/common';

import {
  AuthStoresController as Controller,
  CreateStore,
  LoginStore,
} from './auth-stores.controller.decorator';
import { AuthStoresService } from './auth-stores.service';
import { CreateStoreBodyRequestDto } from './dto';
import { ILoginStoreRequest } from './type';
import { LoginStoreResponseDto } from './dto/login-store-response.dto';
import { JwtStoreAuth } from '@app/utils/guard';
import { StoreJwtRequestDto } from '@api/shared/dto';
import { JwtToken } from '@app/utils/jwt-token.decorator';

@Controller()
export class AuthStoresController {
  constructor(private readonly authStoresService: AuthStoresService) {}

  @CreateStore()
  createStore(@Body() createStoreBodyDto: CreateStoreBodyRequestDto) {
    return this.authStoresService.createStore(createStoreBodyDto);
  }

  @LoginStore()
  async loginStore(@Req() { user }: { user: ILoginStoreRequest }) {
    return new LoginStoreResponseDto({
      accessToken: await this.authStoresService.login(user),
    });
  }

  @JwtStoreAuth()
  @Get('test')
  test(@JwtToken() { store }: StoreJwtRequestDto) {
    return { store };
  }
}
