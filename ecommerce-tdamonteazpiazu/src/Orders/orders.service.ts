import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../Users/users.entity";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "../Products/products.entity";
import { OrderDetail } from "../OrderDetails/orderDetails.entity";
import { CreateOrderDto } from "./createOrder.dto";

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail) private readonly orderDetailsRepository: Repository<OrderDetail>) {}

    async getAllOrders(): Promise<Order[]> {
        try {
            const orders = await this.ordersRepository.find({ relations: { user: true, orderDetail: { products: true }}});
            if (!orders) {
                throw new NotFoundException('Orders not found');
            }
            return orders
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getOrderbyId(id: string): Promise<Order> {
        try {
            const foundOrder = await this.ordersRepository.findOne({ where: { id: id }, relations: { user: true, orderDetail: { products: true } } });
            if (!foundOrder) {
                throw new NotFoundException('Order not found');
            }
            return foundOrder
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async addOrder(data : CreateOrderDto) {
        try {
            const updatedProduct = []
            let totalPrice = 0
    
            const user = await this.usersRepository.findOne({ where: { id: data.userId }, select:["id"] })
            if (!user) {
                throw new NotFoundException('User not found')
            }
            for(const product of data.products) {
                const foundProduct = await this.productsRepository.findOne({ where: { id: product.id } })
                if(!foundProduct) {
                    throw new NotFoundException('One of the products was not found')
                }
                if(foundProduct.stock < product.quantity) {
                    throw new BadRequestException('Not enough stock for one of the products')
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
        } catch (error) {
            if(error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}