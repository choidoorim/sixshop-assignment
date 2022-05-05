import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Customer } from '@prisma/client';

import { Role } from '@app/constants';

import { AuthCustomersService } from '../auth-customers.service';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(
  Strategy,
  'local-customer',
) {
  constructor(private authCustomersService: AuthCustomersService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<any> {
    const customer: Omit<Customer, 'password'> | null =
      await this.authCustomersService.validateCustomerForAuth(email, password);
    if (!customer) {
      throw new UnauthorizedException('로그인 인증 실패');
    }
    return { customerId: customer.id, role: Role.CUSTOMER };
  }
}
