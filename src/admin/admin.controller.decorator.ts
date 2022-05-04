import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AdminController = () =>
  applyDecorators(Controller({ path: 'admin' }), ApiTags('admin'));
