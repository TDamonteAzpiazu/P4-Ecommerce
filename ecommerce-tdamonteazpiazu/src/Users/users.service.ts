import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/Orders/orders.entity";
import { OrderDetail } from "src/OrderDetails/orderDetails.entity";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./createUser.dto";
import { Role } from "src/Roles/roles.enum";

@Injectable()
export class UsersService implements OnModuleInit{
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail) private readonly orderDetailsRepository: Repository<OrderDetail>) {}

    async onModuleInit() {
        const user = await this.usersRepository.findOne({ where : { email: 'tobo@mail.com' }});
        if(!user) {
            const hashedPassword = await bcrypt.hash('Password1!', 10);
            return await this.usersRepository.save({
                name: 'Tobias', 
                email: 'tobo@mail.com', 
                password: hashedPassword, 
                address: "Calle falsa 222",
                phone: 22222222,
                country: "Argentina",
                city: "Buenos Aires",
                role: Role.Admin
            });
        }
    }

    async getUsers(pageNumber: number, limitNumber: number): Promise<User[]> {
        const [users] = await this.usersRepository.findAndCount({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            relations: { orders: true },
            select: ['id', 'name', 'email', 'password', 'phone', 'country', 'address', 'city', 'role', 'orders']
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
