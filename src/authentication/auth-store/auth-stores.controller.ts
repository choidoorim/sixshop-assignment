import { Body, Get, Req } from '@nestjs/common';

import {
  AuthStoresController as Controller,
  CreateStore,
  LoginStore,
} from './auth-stores.controller.decorator';
import { AuthStoresService } from './auth-stores.service';
import { CreateStoreBodyDto } from './dto';
import { ILoginStoreRequest } from './type';
import { LoginStoreResponseDto } from './dto/login-store-response.dto';
import { JwtStoreAuth } from '@app/utils/guard';
import { StoreJwtRequestDto } from '@api/shared/dto';
import { StoreJwtToken } from '@app/utils/store.decorator';

@Controller()
export class AuthStoresController {
  constructor(private readonly authStoresService: AuthStoresService) {}

  @CreateStore()
  createStore(@Body() createStoreBodyDto: CreateStoreBodyDto) {
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
  test(@StoreJwtToken() { store, role }: StoreJwtRequestDto) {
    return { store, role };
  }
}
