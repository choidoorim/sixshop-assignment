import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@app/prisma';
import { generateHash } from '@app/utils';

import { AdminRepository, StoresRepository } from './repository';
import { CreateAdminRequestDto } from '../authentication/auth/dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly adminRepository: AdminRepository,
    private readonly storesRepository: StoresRepository,
  ) {}

  private validateAdminByEmail = async (email: string): Promise<void> => {
    const result = await this.adminRepository.findByEmail(
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

    try {
      await this.prismaService.$transaction(async (prisma) => {
        const { id: adminId } = await this.adminRepository.createAdmin(
          prisma,
          payload,
        );

        const { id } = await this.storesRepository.createStore(prisma, adminId);

        const token = this.jwtService.sign({ store: id });
        await this.storesRepository.updateToken(prisma, id, token);
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  findAdminByEmail = (email: string): Promise<Admin | null> =>
    this.adminRepository.findByEmail(this.prismaService, email);

  getStore = (adminId: string) =>
    this.storesRepository.getStore(this.prismaService, adminId);
}
