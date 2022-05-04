import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '@app/prisma';
import { generateHash, isMatch } from '@app/utils';

import { StoresRepository } from '../../stores/stores.repository';
import { CreateStoreBodyDto } from './dto';

@Injectable()
export class AuthStoresService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storesRepository: StoresRepository,
  ) {}

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
}
