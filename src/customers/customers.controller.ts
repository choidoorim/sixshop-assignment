import { CustomersController as Controller } from './customers.controller.decorator';
import { CustomersService } from './customers.service';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
}
