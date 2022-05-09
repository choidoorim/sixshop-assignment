import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  generateHash = async (password: string): Promise<string> => {
    const salt_rounds = Number(this.configService.get<number>('SALT_ROUNDS'));
    const salt = await bcrypt.genSalt(salt_rounds);
    return bcrypt.hash(password, salt);
  };

  isMatch = (password: string, hash: string): Promise<boolean> =>
    bcrypt.compare(hash, password);
}
