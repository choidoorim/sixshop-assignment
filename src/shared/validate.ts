import { ForbiddenException } from '@nestjs/common';
import { MetaType } from '@prisma/client';

export const isRightType = (
  value: number | string | boolean,
  type: MetaType,
) => {
  if (type === MetaType.INT && typeof value === 'number') {
    return true;
  }
  if (type === MetaType.STRING && typeof value === 'string') {
    return true;
  }
  return type === MetaType.BOOLEAN && typeof value === 'boolean';
};

export const validateTokenStore = (tokenStoreId: string, storeId: string) => {
  if (tokenStoreId !== storeId) {
    throw new ForbiddenException(
      '토큰의 Store id 와 해당 Store id 가 다릅니다',
    );
  }
};
