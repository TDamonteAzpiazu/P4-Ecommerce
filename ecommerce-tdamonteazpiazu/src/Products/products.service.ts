import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.interface";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}
    getProducts() : Promise<Product[]> {
        return this.productsRepository.getProducts();
    }

    getProductById(id:number) : Promise<Product> {
        return this.productsRepository.getProductById(id);
    }

    createProduct(product: Omit<Product, 'id'>) : Promise<number> {
        return this.productsRepository.createProduct(product);
    }

    updateProduct(id: number, product: Partial<Product>) : Promise<number> {
        return this.productsRepository.updateProduct(id, product);
    }

    deleteProduct(id: number) : Promise<number> {
        return this.productsRepository.deleteProduct(id);
    }
}