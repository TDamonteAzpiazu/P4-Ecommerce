// import { Injectable } from "@nestjs/common";
// import { User } from "./users.interfaces";

// @Injectable()
// export class UsersRepository {
//     private users = [{
//         id: 1,
//         email: 'tobi@mail.com',
//         name: 'Tobias',
//         password: '111111',
//         address: 'Calle falsa 111',
//         phone: '111111111',
//         country: 'Argentina',
//         city: 'Buenos Aires'
//     },{
//         id: 2,
//         email: 'juan@mail.com',
//         name: 'Juan',
//         password: '222222',
//         address: 'Calle falsa 222',
//         phone: '2222222222',
//         country: 'Argentina',
//         city: ''
//     },{
//         id: 3,
//         email: 'maxi@mail.com',
//         name: 'Maxi',
//         password: '333333',
//         address: 'Calle falsa 333',
//         phone: '3333333333',
//         country: '',
//         city: ''
//     }];
    
//     async getUsers(pageNumber: number, limitNumber: number) : Promise<Omit<User, 'password'>[]> {
//         const startIndex = (pageNumber - 1) * limitNumber;
//         const endIndex = startIndex + limitNumber;
//         const usersWithoutPassword = this.users.slice(startIndex, endIndex).map(({password, ...rest}) => rest);
//         return usersWithoutPassword;
//     }

//     async getUserById(id: number) : /*Promise<User>*/ Promise<Omit<User, 'password'>>  {
//         // return this.users.find(user => user.id === id);
//         const user = this.users.find(user => user.id === id);
//         const { password, ...rest } = user;
//         return rest;
//     }

//     async createUser(user : Omit<User, 'id'>): Promise<Omit<User, 'password'> | string> {
//     const id = this.users[this.users.length - 1].id + 1;
//     const newUser = {id, ...user};
//     this.users.push(newUser);
//     const { password, ...rest } = newUser;
//     return rest;
//     }

//     async updateUser(id: number, user: Partial<User>): Promise<Omit<User, 'password'> | string> {
//         const foundUser = this.users.find(user => user.id === id);
//         if(!foundUser) {
//             return "User not found";
//         }
//         const updatedUser = {...foundUser, ...user};
//         this.users = this.users.map(user => user.id === id ? updatedUser : user);
//         const { password, ...rest } = updatedUser;
//         return rest;
//     }

//     async deleteUser(id: number) : Promise<Omit<User, 'password'>> {
//         const i = this.users.findIndex(user => user.id === id);
//         const user = this.users[i];
//         this.users.splice(i, 1);
//         const { password, ...rest } = user;
//         return rest;
//     }

//     async findByCredentials(email: string, password: string) : Promise<User | null> {
//         const user = this.users.find(user => user.email === email && user.password === password);
//         return user ? user : null;
//     }
// }