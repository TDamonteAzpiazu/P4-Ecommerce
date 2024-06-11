import { Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/Roles/roles.enum";
import { CreateUserDto } from "./createUser.dto";

@Injectable()
export class UsersService implements OnModuleInit{
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async onModuleInit() {
        const user = await this.usersRepository.findOne({ where : { email: 'tobo@mail.com' }});
        if(!user) {
            const hashedPassword = await bcrypt.hash('Password1!', 10);
            return await this.usersRepository.save({
                name: 'Tobias', 
                email: 'tobo@mail.com', 
                password: hashedPassword, 
                address: 'Calle falsa 222',
                phone: 22222222,
                country: 'Argentina',
                city: 'Buenos Aires',
                role: Role.Admin
            });
        }
    }

    async getUsers(pageNumber: number, limitNumber: number): Promise<User[]> {
        try {
            const [users] = await this.usersRepository.findAndCount({
                skip: (pageNumber - 1) * limitNumber,
                take: limitNumber,
                relations: { orders: true },
                select: ['id', 'name', 'email', 'password', 'phone', 'country', 'address', 'city', 'role']
            });
            if(users.length === 0) {
                throw new NotFoundException('Users not found');
            }
            return users;
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException();
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const userFound = await this.usersRepository.findOne({ where : { id: id }, relations: { orders: true }});
            if(!userFound) {
                throw new NotFoundException('User not found');
            }
            return userFound;
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateUser(id: string, user: Partial<CreateUserDto>) : Promise<User> {
        try {
            const foundUser = await this.usersRepository.findOne({ where : { id: id }});
            if(!foundUser) {
                throw new NotFoundException('User not found');
            }
            this.usersRepository.merge(foundUser, user);
            await this.usersRepository.save(foundUser);
            return foundUser
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async deleteUser(id: string) : Promise<User> {
        try {
            const foundUser = await this.usersRepository.findOne({ where : { id: id }/*, relations: { orders: { orderDetail: true } }*/});
            if(!foundUser) {
                throw new NotFoundException('User not found');
            }
            await this.usersRepository.remove(foundUser)
            return foundUser
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
