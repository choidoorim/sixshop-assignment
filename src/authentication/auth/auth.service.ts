import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { isMatch } from '@app/utils';

import { StoresService } from '../../stores/stores.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly storesService: StoresService,
    private jwtService: JwtService,
  ) {}

  validateStore = async (email: string, password: string) => {
    const store = await this.storesService.findStoreByEmail(email);
    if (store && (await isMatch(store.password, password))) {
      const { password, ...rest } = store;
      return rest;
    }
    return null;
  };

  login = (adminId: string) => {
    const payload = { adminId };
    return this.jwtService.sign(payload);
  };
}
