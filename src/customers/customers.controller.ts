import { JwtToken } from '@app/utils';
import { StoreJwtRequestDto } from '@api/shared/dto';

import {
  CustomersController as Controller,
  CreateCustomer,
} from './customers.controller.decorator';
import { CustomersService } from './customers.service';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @CreateCustomer()
  createCustomer(@JwtToken() { store }: StoreJwtRequestDto) {
    return store;
  }
}
