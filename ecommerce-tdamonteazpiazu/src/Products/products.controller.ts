import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { ProductDto } from "./product.dto";
import { Roles } from "src/Roles/role.decorator";
import { Role } from "src/Roles/roles.enum";
import { RolesGuard } from "src/guards/admin.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
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
        @Query('limit', ParseIntPipe) limit: number = 5,
        @Query('page', ParseIntPipe) page: number = 1,
    ) : Promise<Product[]> {
        return await this.productsService.getAllProducts(page, limit);
    }

    @Get(':id')
    async getProductById(@Param('id', ParseUUIDPipe) id: string) : Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthorizationGuard, RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<ProductDto>) : Promise<Product>{
        return await this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) : Promise<Product> {
        return await this.productsService.deleteProduct(id);
    }
}
