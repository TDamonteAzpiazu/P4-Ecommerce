import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Order } from "src/Orders/orders.entity";
import { OrderDetail } from "src/OrderDetails/orderDetails.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Order, OrderDetail])],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UsersModule {}