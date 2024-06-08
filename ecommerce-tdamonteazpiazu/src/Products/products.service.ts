import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "src/Categories/categories.entity";
import { products } from "src/utils/products";
import { ProductDto } from "./product.dto";
import { CategoriesService } from "src/Categories/categories.service";

@Injectable()
export class ProductsService implements OnModuleInit{
    constructor(
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        private readonly categoriesService: CategoriesService
    ) {}

    async onModuleInit() {
        await this.categoriesService.addCategories();
        await this.seedProducts()
    }

    async createProduct(product: ProductDto) : Promise<Product> {
        const existingProduct = await this.productsRepository.findOne({where: {name: product.name , description: product.description}});
        console.log(existingProduct);
        if(existingProduct) {
            throw new NotFoundException('Product already exists, use the update Route');
        }
        if(!product.category) {
            throw new NotFoundException('Category is missing');
        }
        const category = await this.categoryRepository.findOne({where: {name: product.category}});
        if(!category) {
            throw new NotFoundException('Category not found');
        }
        const newProduct = this.productsRepository.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imgUrl: product.imgUrl,
            category: category.id
        });
        await this.productsRepository.save(newProduct);
        return newProduct;
    }

    async seedProducts() {
        const productsArray = await this.productsRepository.find();

        if(productsArray.length === 0) {
            for (const product of products) {
                const category = await this.categoryRepository.findOne({where: {name: product.category}});
                if(category) {
                    product.category = category.id;
                    await this.productsRepository.save(product);
                }
            }
        }
    }

    async getAllProducts(page: number, limit: number) : Promise<Product[]> {
        const [products] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: { category: true },
        });
        return products;
    }

    async getProductById(id: string) : Promise<Product> {
        return await this.productsRepository.findOne({where: {id: id}, relations: { category: true }});
    }

    async updateProduct(id: string, product: Partial<ProductDto>) : Promise<Product> {
        const productToUpdate = await this.productsRepository.findOne({where: {id: id}});
        if(!productToUpdate) {
            throw new NotFoundException('Product not found');
        }
        if(product.category){
            const category = await this.categoryRepository.findOne({where: {name: product.category}});
            if(!category) {
                throw new NotFoundException('Category not found');
            }
            product.category = category.id;
        }
        this.productsRepository.merge(productToUpdate, product);
        await this.productsRepository.save(productToUpdate);
        return productToUpdate;
    }

    async deleteProduct(id: string) : Promise<Product> {
        const productToDelete = await this.productsRepository.findOne({where: {id: id}});
        await this.productsRepository.remove(productToDelete);
        return productToDelete;
    }
}
