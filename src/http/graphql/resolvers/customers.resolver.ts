import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthUser, CurrentUser } from '@http/auth/current-user';
import { Customer } from '@http/graphql/models/customer';

import { CustomersService } from '@services/customers.service';
import { PurchasesService } from '@services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
