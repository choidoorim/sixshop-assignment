import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Store } from '@prisma/client';

import { Role } from '@app/constants';

import { AuthStoresService } from '../auth-stores.service';

@Injectable()
export class LocalStoreStrategy extends PassportStrategy(
  Strategy,
  'local-store',
) {
  constructor(private authStoresService: AuthStoresService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<any> {
    const store: Omit<Store, 'password'> | null =
      await this.authStoresService.validateStoreForAuth(email, password);
    if (!store) {
      throw new UnauthorizedException('로그인 인증 실패');
    }
    return { store: store.id, role: Role.STORE };
  }
}
