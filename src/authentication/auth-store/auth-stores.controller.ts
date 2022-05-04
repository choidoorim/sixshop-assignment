import { Body } from '@nestjs/common';

import {
  AuthStoresController as Controller,
  CreateStore,
} from './auth-stores.controller.decorator';
import { AuthStoresService } from './auth-stores.service';
import { CreateStoreBodyDto } from './dto';

@Controller()
export class AuthStoresController {
  constructor(private readonly authStoresService: AuthStoresService) {}

  @CreateStore()
  createStore(@Body() createStoreBodyDto: CreateStoreBodyDto) {
    return this.authStoresService.createStore(createStoreBodyDto);
  }
}
