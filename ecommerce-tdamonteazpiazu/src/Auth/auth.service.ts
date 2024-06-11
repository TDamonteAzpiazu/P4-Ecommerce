import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { User } from "src/Users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/Users/createUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService) {}

    async signIn(credentials: AuthDto) : Promise<{message: string, token: string}> {
        try {
            const user = await this.usersRepository.findOne({where: {email: credentials.email}, select: [ 'id', 'email', 'password', 'role']});
            if (!user) {
                throw new NotFoundException('Email o contraseña incorrectos')
            }
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            if (!isPasswordValid) {
                throw new NotFoundException('Email o contraseña incorrectos')
            }
            const userPayload={
                id: user.id,
                email: user.email,
                role: user.role
            }
            const token = this.jwtService.sign(userPayload);
            return {
                message: 'Logged in',
                token
            }
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signUp(user: CreateUserDto) : Promise<Omit<User, 'password'>> {
        try {
            if(user.password !== user.confirmPassword) {
                throw new BadRequestException('Passwords do not match');
            }
            const userFound = await this.usersRepository.findOne({where: {email: user.email}});
            if (userFound) {
                throw new BadRequestException('User with this email already exists, please sign in.');
            }
    
            const hashedPassword = await bcrypt.hash(user.password, 10);
            if(!hashedPassword) throw new BadRequestException('Error hashing password');
            const newUser = this.usersRepository.create({...user, password: hashedPassword});
            await this.usersRepository.save(newUser);
            const { password, ...rest } = newUser;
            return rest;
        } catch (error) {
            if(error instanceof BadRequestException) {
                throw error
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
