import { ForbiddenException } from '@nestjs/common';

export const validateTokenStore = (tokenStoreId: string, storeId: string) => {
  if (tokenStoreId !== storeId) {
    throw new ForbiddenException(
      '토큰의 Store id 와 해당 Store id 가 다릅니다',
    );
  }
};
