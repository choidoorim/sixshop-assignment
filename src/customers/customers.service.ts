import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}
}
