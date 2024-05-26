import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Users/users.entity";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "src/Products/products.entity";
import { OrderDetail } from "src/OrderDetails/orderDetails.entity";
import { OrdersDto } from "./orders.dto";

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail) private readonly orderDetailsRepository: Repository<OrderDetail>) {}

    async getAllOrders(): Promise<Order[]> {
        return await this.ordersRepository.find({ relations: { user: true, orderDetail: { products: true } } });
    }

    async getOrderbyId(id: string): Promise<Order> {
        return await this.ordersRepository.findOne({ where: { id: id }, relations: { user: true, orderDetail: { products: true } } });
    }

    async addOrder(data: OrdersDto) {
        const updatedProduct = []
        let totalPrice = 0

        const user = await this.usersRepository.findOne({ where: { id: data.userId } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        for(const product of data.products) {
            const foundProduct = await this.productsRepository.findOne({ where: { id: product.id } })
            if(!foundProduct) {
                throw new NotFoundException('One of the products was not found')
            }
            if(foundProduct.stock < product.quantity) {
                throw new NotFoundException('Not enough stock for one of the products')
            }
            foundProduct.stock -= product.quantity
            updatedProduct.push(foundProduct)
            totalPrice += foundProduct.price * product.quantity
        }

        await this.productsRepository.save(updatedProduct)

        const newOrderDetail = this.orderDetailsRepository.create({
            price: totalPrice,
            products: updatedProduct
        })
        await this.orderDetailsRepository.save(newOrderDetail)
        
        const newOrder = this.ordersRepository.create({
            date: new Date(),
            orderDetail: newOrderDetail,
            user: user
        })
        await this.ordersRepository.save(newOrder)

        return newOrder
    }
}