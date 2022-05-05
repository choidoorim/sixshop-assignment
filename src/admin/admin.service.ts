import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from '@prisma/client';

import { PrismaService } from '@app/prisma';

import { AdminRepository } from './admin.repository';
import { generateHash } from '@app/utils';

import { CreateAdminRequestDto } from '../authentication/auth/dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storesRepository: AdminRepository,
  ) {}

  private validateAdminByEmail = async (email: string): Promise<void> => {
    const result = await this.storesRepository.findByEmail(
      this.prismaService,
      email,
    );

    if (result) {
      throw new NotFoundException();
    }
  };

  createAdmin = async ({ password, email, name }: CreateAdminRequestDto) => {
    await this.validateAdminByEmail(email);
    const payload = { password: await generateHash(password), email, name };

    return this.storesRepository.createAdmin(this.prismaService, payload);
  };

  findStoreByEmail = (email: string): Promise<Admin | null> =>
    this.storesRepository.findByEmail(this.prismaService, email);
}
