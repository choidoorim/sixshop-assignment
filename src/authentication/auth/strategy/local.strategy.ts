import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Customer } from '@prisma/client';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<any> {
    const customer: Omit<Customer, 'password'> | null =
      await this.authService.validateCustomerForAuth(email, password);
    if (!customer) {
      throw new UnauthorizedException('비밀번호 인증 실패');
    }
    return { customerId: customer.id, customerStoreId: customer.store };
  }
}
