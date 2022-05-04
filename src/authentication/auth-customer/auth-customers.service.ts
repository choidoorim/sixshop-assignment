import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@app/prisma';
import { generateHash, isMatch } from '@app/utils';

import { CreateCustomerBodyDto } from './dto';
import { ILoginCustomerRequest } from './type';
import { CustomersService } from '../../customers/customers.service';
import { CustomersRepository } from '../../customers/customers.repository';

@Injectable()
export class AuthCustomersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersService: CustomersService,
    private readonly customersRepository: CustomersRepository,
    private jwtService: JwtService,
  ) {}

  validateCustomerForAuth = async (email: string, password: string) => {
    const customer = await this.customersService.findCustomerByEmail(email);
    if (customer && (await isMatch(customer.password, password))) {
      const { password, ...rest } = customer;
      return rest;
    }
    return null;
  };

  private validateCustomerByEmail = async (email: string) => {
    const customer = await this.customersService.findCustomerByEmail(email);
    if (customer) {
      throw new ForbiddenException(
        '이미 존재하는 회원입니다. 로그인 해주세요.',
      );
    }
  };

  createCustomer = async ({
    name,
    email,
    password,
    store,
  }: CreateCustomerBodyDto) => {
    await this.validateCustomerByEmail(email);

    try {
      await this.customersRepository.createCustomer(this.prismaService, {
        name,
        email,
        password: await generateHash(password),
        store,
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  };

  login = async (payload: ILoginCustomerRequest) =>
    this.jwtService.sign(payload);
}
