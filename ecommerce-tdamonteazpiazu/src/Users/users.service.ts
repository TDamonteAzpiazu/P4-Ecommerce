import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/Orders/orders.entity";
import { OrderDetail } from "src/OrderDetails/orderDetails.entity";
import { CreateUserDto } from "./createUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail) private readonly orderDetailsRepository: Repository<OrderDetail>) {}
    async getUsers(pageNumber: number, limitNumber: number): Promise<User[]> {
        const [users] = await this.usersRepository.findAndCount({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            relations: { orders: true }
        });
        return users;
    }

    async getUserById(id: string): Promise<User> {
        const userFound = await this.usersRepository.findOne({ where : { id: id }, relations: { orders: true }});
        if(!userFound) {
            throw new NotFoundException('User not found');
        }
        return userFound;
    }

    async createUser(user: CreateUserDto) : Promise<User> {
        const userFound = await this.usersRepository.findOne({where: {email: user.email, password: user.password, name: user.name}});
        if (userFound) {
            throw new BadRequestException('User already exists');
        }
        const newUser = this.usersRepository.create(user);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async updateUser(id: string, user: Partial<User>) : Promise<User> {
        const foundUser = await this.usersRepository.findOne({ where : { id: id }});
        this.usersRepository.merge(foundUser, user);
        await this.usersRepository.save(foundUser);
        return foundUser
    }

    async deleteUser(id: string) : Promise<User> {
        const foundUser = await this.usersRepository.findOne({ where : { id: id }, relations: { orders: { orderDetail: true } }});
        if(!foundUser) {
            throw new NotFoundException('User not found');
        }

        for(const order of foundUser.orders) {
            if(order.orderDetail) {
                await this.orderDetailsRepository.delete(order.orderDetail.id)
            }
        }
        await this.ordersRepository.delete({ user: foundUser })
        await this.usersRepository.delete(foundUser.id);
        
        // await this.usersRepository.remove(foundUser)

        return foundUser
    }
}
