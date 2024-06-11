import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { ProductDto } from "./product.dto";
import { Roles } from "../Roles/role.decorator";
import { Role } from "../Roles/roles.enum";
import { RolesGuard } from "../guards/admin.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateProductDecorator, DeleteProductDecorator, GetAllProductsDecorator, GetProductByIdDecorator, UpdateProductDecorator } from "./product.decorator";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    @CreateProductDecorator()
    async createProduct(@Body() product : ProductDto) : Promise<Product> {
        return await this.productsService.createProduct(product);
    }

    /*@Post('seeder')
    @ApiOperation({summary: 'Seed products', description: 'Crea los productos en la base de datos.'})
    async seedProducts() {
        await this.productsService.seedProducts();
        return 'Products seeded';
    }*/

    @Get()
    @GetAllProductsDecorator()
    async getAllProducts(
        @Query('limit', ParseIntPipe) limit: number = 5,
        @Query('page', ParseIntPipe) page: number = 1,
    ) : Promise<Product[]> {
        return await this.productsService.getAllProducts(page, limit);
    }

    @Get(':id')
    @GetProductByIdDecorator()
    async getProductById(@Param('id', ParseUUIDPipe) id: string) : Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Put(':id')
    @UpdateProductDecorator()
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard, RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<ProductDto>) : Promise<Product>{
        return await this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    @DeleteProductDecorator()
    async deleteProduct(@Param('id') id: string) : Promise<Product> {
        return await this.productsService.deleteProduct(id);
    }
}
