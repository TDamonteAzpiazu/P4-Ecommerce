import { Injectable } from "@nestjs/common";
import { CredentialsDto } from "./auth.dto";
import { User } from "src/Users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
    getAuth(): string {
        return "Getting auth";
    }

    async signIn(credentials: CredentialsDto) : Promise<User | string> {
        if(!credentials.email || !credentials.password){
            return "Faltan credenciales";
        }
        const user = await this.usersRepository.findOne({where: {email: credentials.email, password:credentials.password}});
        if (!user) {
            return "Email o contraseña incorrectos"
        }
        return user
    }
}
