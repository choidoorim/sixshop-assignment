import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

@Injectable()
export class StoresService {
  constructor(private readonly prismaService: PrismaService) {}
}
