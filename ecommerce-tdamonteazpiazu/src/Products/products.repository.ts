import { Injectable } from "@nestjs/common";

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
    getProducts() {
        return this.products;
    }
}