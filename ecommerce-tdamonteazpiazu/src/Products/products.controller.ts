import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthorizationGuard } from "src/Auth/guards/authorization.guard";
import { ProductDto } from "./product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    @UseGuards(AuthorizationGuard)
    async createProduct(@Body() product : ProductDto) : Promise<Product> {
        return await this.productsService.createProduct(product);
    }

    @Post('seeder')
    async seedProducts() {
        await this.productsService.seedProducts();
        return 'Products seeded';
    }

    @Get()
    async getAllProducts(
        @Query('limit') limit: number = 5,
        @Query('page') page: number = 1,
    ) : Promise<Product[]> {
        return await this.productsService.getAllProducts(page, limit);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) : Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Put(':id')
    @UseGuards(AuthorizationGuard)
    async updateProduct(@Param('id') id: string, @Body() product: Partial<Product>) : Promise<Product>{
        return await this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    @UseGuards(AuthorizationGuard)
    async deleteProduct(@Param('id') id: string) : Promise<Product> {
        return await this.productsService.deleteProduct(id);
    }
}
