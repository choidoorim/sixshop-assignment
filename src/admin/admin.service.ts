import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

  getStoreToken = async (adminId: string) => {
    const { token } = await this.storesRepository.getStore(
      this.prismaService,
      adminId,
    );

    return token;
  };
}
