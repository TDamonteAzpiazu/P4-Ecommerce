import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Product } from "src/Products/products.entity";
import { User } from "src/Users/users.entity";
import { OrderDetail } from "src/OrderDetails/orderDetails.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, User, OrderDetail])],
    controllers: [OrdersController],
    providers: [OrdersService]
})

export class OrdersModule { }