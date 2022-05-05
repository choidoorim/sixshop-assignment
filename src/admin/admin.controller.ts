import {
  AdminController as Controller,
  GetStoreId,
} from './admin.controller.decorator';
import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

@Controller()
export class AdminController {
  @GetStoreId()
  getStoreId(@JwtToken() { adminId }: AdminJwtRequestDto) {
    return adminId;
  }
}
