import { Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from "@nestjs/common";
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
        try {
            const existingProduct = await this.productsRepository.findOne({where: {name: product.name , description: product.description}});
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
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
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
        try {
            const [products] = await this.productsRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: { category: true },
            });
            if(products.length === 0) {
                throw new NotFoundException('Products not found');
            }
            return products;
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getProductById(id: string) : Promise<Product> {
        try {
            const foundProduct = await this.productsRepository.findOne({where: {id: id}, relations: { category: true }});
            if(!foundProduct) {
                throw new NotFoundException('Product not found');
            }
            return foundProduct;
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateProduct(id: string, product: Partial<ProductDto>) : Promise<Product> {
        try {
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
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async deleteProduct(id: string) : Promise<Product> {
        try {
            const productToDelete = await this.productsRepository.findOne({where: {id: id}});
            if(!productToDelete) {
                throw new NotFoundException('Product not found');
            }
            await this.productsRepository.remove(productToDelete);
            return productToDelete;
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
