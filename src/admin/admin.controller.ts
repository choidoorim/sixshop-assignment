import { AdminController as Controller } from './admin.controller.decorator';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
