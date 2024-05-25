// import { Injectable } from "@nestjs/common";
// import { CredentialsDto } from "./auth.dto";
// import { UsersRepository } from "src/Users/users.repository";
// import { User } from "src/Users/users.entity";

// @Injectable()
// export class AuthService {
//     constructor(private readonly usersRepository: UsersRepository) {}
//     getAuth(): string {
//         return "Getting auth";
//     }

//     async signIn(credentials: CredentialsDto) : Promise<User | string> {
//         if(!credentials.email || !credentials.password){
//             return "Faltan credenciales";
//         }
//         const user = await this.usersRepository.findByCredentials(credentials.email, credentials.password);
//         if (!user) {
//             return "Email o contraseña incorrectos"
//         }
//         return user
//     }
// }
