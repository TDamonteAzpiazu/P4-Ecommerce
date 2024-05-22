import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [{
        id: 1,
        email: 'tobi@mail.com',
        name: 'Tobias',
        password: '111111',
        address: 'Calle falsa 111',
        phone: '111111111',
        country: 'Argentina',
        city: 'Buenos Aires'
    },{
        id: 2,
        email: 'juan@mail.com',
        name: 'Juan',
        password: '222222',
        address: 'Calle falsa 222',
        phone: '2222222222',
        country: 'Argentina'
    },{
        id: 3,
        email: 'maxi@mail.com',
        name: 'Maxi',
        password: '333333',
        address: 'Calle falsa 333',
        phone: '3333333333'
    }];
    
    async getUsers() {
        return this.users;
    }
}