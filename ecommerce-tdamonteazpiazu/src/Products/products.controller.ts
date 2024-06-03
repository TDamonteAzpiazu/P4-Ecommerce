import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { ProductDto } from "./product.dto";
import { Roles } from "../Roles/role.decorator";
import { Role } from "../Roles/roles.enum";
import { RolesGuard } from "../guards/admin.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    @ApiOperation({summary: 'Create product', description: 'Recibe por body la información de un producto y la crea en la base de datos.'})
    @ApiBody({type: ProductDto})
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthorizationGuard, RolesGuard)
    async createProduct(@Body() product : ProductDto) : Promise<Product> {
        return await this.productsService.createProduct(product);
    }

    @Post('seeder')
    @ApiOperation({summary: 'Seed products', description: 'Crea los productos en la base de datos.'})
    async seedProducts() {
        await this.productsService.seedProducts();
        return 'Products seeded';
    }

    @Get()
    @ApiOperation({summary: 'Get all products', description: 'Recibe por query la página y el límite de elementos por página y retorna un arreglo de objetos con todos los productos.'})
    @ApiQuery({name: 'page', required: false, type: Number})
    @ApiQuery({name: 'limit', required: false, type: Number})
    async getAllProducts(
        @Query('limit', ParseIntPipe) limit: number = 5,
        @Query('page', ParseIntPipe) page: number = 1,
    ) : Promise<Product[]> {
        return await this.productsService.getAllProducts(page, limit);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get product by ID', description: 'Recibe por parámetro el ID de un producto y retorna un objeto con todos sus datos.'})
    async getProductById(@Param('id', ParseUUIDPipe) id: string) : Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update product', description: 'Recibe por parámetro el ID de un producto y por body la información con la que actualiza sus datos.'})
    @ApiBody({type: ProductDto})
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard, RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<ProductDto>) : Promise<Product>{
        return await this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete product', description: 'Recibe por parámetro el ID de un producto y lo elimina de la base de datos.'})
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthorizationGuard, RolesGuard)
    async deleteProduct(@Param('id') id: string) : Promise<Product> {
        return await this.productsService.deleteProduct(id);
    }
}
