// import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
// import { ProductsService } from "./products.service";
// import { Product } from "./products.interface";
// import { AuthorizationGuard } from "src/Auth/guards/authorization.guard";

import { Controller, Get, Post, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";

// @Controller('products')
// export class ProductsController {
//     constructor(private readonly productsService: ProductsService) {}

//     @Get()
//     getProducts() : Promise<Product[]> {
//         return this.productsService.getProducts();
//     }

//     @Get(':id')
//     getProductById(@Param('id') id: string) : Promise<Product> {
//         return this.productsService.getProductById(Number(id));
//     }

//     @Post()
//     @UseGuards(AuthorizationGuard)
//     createProduct(@Body() product: Omit<Product, 'id'>) : Promise<number> {
//         return this.productsService.createProduct(product);
//     }

//     @Put(':id')
//     @UseGuards(AuthorizationGuard)
//     updateProduct(@Param('id') id: string, @Body() product: Partial<Product>) : Promise<number> {
//         return this.productsService.updateProduct(Number(id), product);
//     }

//     @Delete(':id')
//     @UseGuards(AuthorizationGuard)
//     deleteProduct(@Param('id') id: string) : Promise<number> {
//         return this.productsService.deleteProduct(Number(id));
//     }
// }

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('seeder')
    async seedProducts() {
        await this.productsService.seedProducts();
        return 'Products seeded';
    }

    @Get()
    async getAllProducts(
        @Query('limit') limit: number = 5,
        @Query('page') page: number = 1,
    ) {
        return await this.productsService.getAllProducts(page, limit);
    }
}