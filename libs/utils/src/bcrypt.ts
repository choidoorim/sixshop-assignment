import * as bcrypt from 'bcrypt';

import { SALT_OR_ROUNDS } from '@app/constants';

export const generateHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_OR_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const isMatch = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(hash, password);
