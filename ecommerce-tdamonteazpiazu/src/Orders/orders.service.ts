import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Users/users.entity";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "src/Products/products.entity";
import { OrderDetail } from "src/OrderDetails/orderDetails.entity";

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail) private readonly orderDetailsRepository: Repository<OrderDetail>) {}

    async getAllOrders(pageNumber: number, limitNumber: number): Promise<Order[]> {
        const [orders] = await this.ordersRepository.findAndCount({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            relations: { user: true, orderDetail: true }
        });
        return orders;
    }

    async getOrderbyId(id: string): Promise<Order> {
        const orderFound = await this.ordersRepository.findOne({ where: { id: id }, relations: { user: true, orderDetail: { products: true } } });
        return orderFound;
    }
}