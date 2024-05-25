import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../Orders/orders.entity';
import {v4 as uuid} from 'uuid';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50})
    name: string;

    @Column({ length: 50, unique: true})
    email: string;

    @Column({ length: 20 })
    password: string;

    @Column('int', { nullable: true })
    phone: number;

    @Column({ length: 50 , nullable: true})
    country: string;

    @Column('text' , { nullable: true})
    address: string;

    @Column({ length: 50 , nullable: true})
    city: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}
