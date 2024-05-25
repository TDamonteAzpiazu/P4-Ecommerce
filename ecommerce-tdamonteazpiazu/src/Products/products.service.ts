import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "src/Categories/categories.entity";
import { products } from "src/utils/products";


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    ) {}

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

    async getAllProducts(page: number, limit: number) {
        const [products] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: { category: true },
        });
        return products;
    }
}



// import { Injectable } from "@nestjs/common";
// import { ProductsRepository } from "./products.repository";
// // import { Product } from "./products.interface";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Product } from "./products.entity";
// import { Repository } from "typeorm";

// @Injectable()
// export class ProductsService {
//     constructor(@InjectRepository(Product)
//     private readonly productsRepository: Repository<Product>) {}
//     getProducts() : Promise<Product[]> {
//         return this.productsRepository.getProducts();
//     }

//     getProductById(id:number) : Promise<Product> {
//         return this.productsRepository.getProductById(id);
//     }

//     createProduct(product: Omit<Product, 'id'>) : Promise<number> {
//         return this.productsRepository.createProduct(product);
//     }

//     updateProduct(id: number, product: Partial<Product>) : Promise<number> {
//         return this.productsRepository.updateProduct(id, product);
//     }

//     deleteProduct(id: number) : Promise<number> {
//         return this.productsRepository.deleteProduct(id);
//     }
// }
