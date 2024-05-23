import { Injectable } from "@nestjs/common";
import { Product } from "./products.interface";

@Injectable()
export class ProductsRepository {
    private products = [{
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        stock: 10,
        imageUrl: 'https://via.placeholder.com/1'
    },{
        id: 2,
        name: 'Product 2',
        description: 'Product 2 description',
        price: 200,
        stock: 20,
        imageUrl: 'https://via.placeholder.com/2'
    },{
        id: 3,
        name: 'Product 3',
        description: 'Product 3 description',
        price: 300,
        stock: 30,
        imageUrl: 'https://via.placeholder.com/3'
    }]
    async getProducts() : Promise<Product[]> {
        return this.products;
    }

    async getProductById(id: number) : Promise<Product> {
        return this.products.find(product => product.id === id);
    }

    async createProduct(product : Omit<Product, 'id'>) : Promise<number> {
        const id = this.products[this.products.length - 1].id + 1;
        this.products.push({id, ...product});
        return id;
    }

    async updateProduct(id: number, product: Partial<Product>) : Promise<number> {
        const i = this.products.findIndex(product => product.id === id);
        this.products[i] = {...this.products[i], ...product};
        return id;
    }

    async deleteProduct(id: number) : Promise<number> {
        const i = this.products.findIndex(product => product.id === id);
        this.products.splice(i, 1);
        return id;
    }
}