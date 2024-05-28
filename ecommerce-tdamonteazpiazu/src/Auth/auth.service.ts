import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoginUserDto } from "./auth.dto";
import { User } from "src/Users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
    getAuth(): string {
        return "Getting auth";
    }

    async signIn(credentials: LoginUserDto) : Promise<User> {
        if(!credentials.email || !credentials.password){
            throw new BadRequestException('Faltan credenciales')
        }
        const user = await this.usersRepository.findOne({where: {email: credentials.email, password:credentials.password}});
        if (!user) {
            throw new NotFoundException('Email o contraseña incorrectos')
        }
        return user
    }
}
