import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const StoresController = () =>
  applyDecorators(Controller({ path: 'store' }), ApiTags('store'));
