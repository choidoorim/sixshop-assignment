import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Store } from '@prisma/client';

import { AuthStoresService } from '../auth-stores.service';

@Injectable()
export class LocalStoreStrategy extends PassportStrategy(Strategy, 'local-store') {
  constructor(private authStoresService: AuthStoresService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<any> {
    const store: Omit<Store, 'password'> | null =
      await this.authStoresService.validateStoreForAuth(email, password);
    if (!store) {
      throw new UnauthorizedException('비밀번호');
    }
    return { store: store.id };
  }
}
