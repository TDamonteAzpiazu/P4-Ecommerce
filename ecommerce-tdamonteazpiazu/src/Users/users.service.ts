import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
    async getUsers(pageNumber: number, limitNumber: number): Promise<User[]> {
        const [users] = await this.usersRepository.findAndCount({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'orders'],
            relations: { orders: true }
        });
        return users;
    }

    async getUserById(id: string): Promise<User> {
        const userFound = await this.usersRepository.findOne({ where : { id: id }, select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'orders'], relations: { orders: true }});
        return userFound;
    }

    async createUser(user: Omit<User, 'id'>) : Promise<User> {
        const newUser = this.usersRepository.create(user);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async updateUser(id: string, user: Partial<User>) : Promise<User> {
        const foundUser = await this.usersRepository.findOne({ where : { id: id }});
        Object.assign(foundUser, user);
        await this.usersRepository.save(foundUser);
        return foundUser
    }

    async deleteUser(id: string) : Promise<User> {
        const foundUser = await this.usersRepository.findOne({ where : { id: id }});
        if(!foundUser) {
            throw new NotFoundException('User not found');
        }
        await this.usersRepository.delete(foundUser);
        return foundUser
    }
}
