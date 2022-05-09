import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@app/prisma';
import { BcryptService } from '@app/utils/bcrypt';

import { AdminRepository, StoresRepository } from './repository';
import { CreateAdminRequestDto } from '../authentication/auth/dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly adminRepository: AdminRepository,
    private readonly storesRepository: StoresRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  getAdmin = async (adminId: string) => {
    const result = await this.adminRepository.getAdmin(
      this.prismaService,
      adminId,
    );
    if (!result) {
      throw new NotFoundException('존재하지 않는 Admin 입니다');
    }
    const { password, updatedAt, id, ...rest } = result;
    return rest;
  };

  private validateAdminByEmail = async (email: string): Promise<void> => {
    const result = await this.adminRepository.findByEmail(
      this.prismaService,
      email,
    );

    if (result) {
      throw new ConflictException('이미 가입 된 회원입니다');
    }
  };

  createAdmin = async ({ password, email, name }: CreateAdminRequestDto) => {
    await this.validateAdminByEmail(email);
    const payload = {
      password: await this.bcryptService.generateHash(password),
      email,
      name,
    };

    try {
      await this.prismaService.$transaction(async (prisma) => {
        const { id: adminId } = await this.adminRepository.createAdmin(
          prisma,
          payload,
        );

        await this.storesRepository.createStore(prisma, adminId);
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
