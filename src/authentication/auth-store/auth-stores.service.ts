import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@app/prisma';
import { generateHash, isMatch } from '@app/utils';

import { StoresRepository } from '../../stores/stores.repository';
import { CreateStoreBodyDto } from './dto';
import { StoresService } from '../../stores/stores.service';
import { ILoginStoreRequest } from './type';

@Injectable()
export class AuthStoresService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly storesService: StoresService,
    private readonly storesRepository: StoresRepository,
  ) {}

  validateStoreForAuth = async (email: string, password: string) => {
    const store = await this.storesService.findStoreByEmail(email);
    if (!store) {
      throw new NotFoundException();
    }
    if (store && (await isMatch(store.password, password))) {
      const { password, ...rest } = store;
      return rest;
    }
    return null;
  };

  createStore = async ({ name, email, password }: CreateStoreBodyDto) => {
    try {
      await this.storesRepository.createStore(this.prismaService, {
        name,
        email,
        password: await generateHash(password),
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  };

  login = async (payload: ILoginStoreRequest) => this.jwtService.sign(payload);
}
