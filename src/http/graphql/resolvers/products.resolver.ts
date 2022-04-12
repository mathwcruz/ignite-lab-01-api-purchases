import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '@database/prisma/prisma.service';
import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { Product } from '@http/graphql/models/product';

@Resolver('test')
export class ProductsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Product])
  @UseGuards(AuthorizationGuard)
  products() {
    return this.prisma.product.findMany();
  }
}
