import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';

import { PrismaService } from '@app/prisma';

import { AdminRepository } from './admin.repository';
import { generateHash } from '@app/utils';

import { CreateAdminRequestDto } from '../authentication/auth/dto';
import { StoresRepository } from './stores.repository';

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
        // TODO: id 를 token 으로 암호화해서 저장하기
        const storeId = this.jwtService.sign({ adminId });

        await this.storesRepository.createStore(prisma, storeId, adminId);
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  findAdminByEmail = (email: string): Promise<Admin | null> =>
    this.adminRepository.findByEmail(this.prismaService, email);
}
