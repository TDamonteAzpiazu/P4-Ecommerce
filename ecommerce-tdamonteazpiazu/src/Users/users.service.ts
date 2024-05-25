import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./users.interfaces";


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getUsers(pageNumber: number, limitNumber: number): Promise<Omit<User, 'password'>[]> {
        return this.usersRepository.getUsers(pageNumber, limitNumber);
    }

    getUserById(id: number): Promise<Omit<User, 'password'>> {
        return this.usersRepository.getUserById(id);
    }

    createUser(user: Omit<User, 'id'>) : Promise<Omit<User, 'password'> | string> {    
        return this.usersRepository.createUser(user);
    }

    updateUser(id: number, user: Partial<User>) : Promise<Omit<User, 'password'> | string> {
        return this.usersRepository.updateUser(id, user);
    }

    deleteUser(id: number) : Promise<Omit<User, 'password'>> {
        return this.usersRepository.deleteUser(id);
    }
}