import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Order } from '../Orders/orders.entity';
import {v4 as uuid} from 'uuid';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', length: 20 , nullable: false, select : false})
    password: string;

    @Column({ type: 'int', nullable: true })
    phone: number;

    @Column({ type: 'varchar', length: 50 , nullable: true})
    country: string;

    @Column({ type: 'text' ,  nullable: true})
    address: string;

    @Column({ type: 'varchar', length: 50 , nullable: true})
    city: string;

    @OneToMany(() => Order, order => order.user, { cascade: true , onDelete: 'CASCADE' })
    @JoinColumn()
    orders: Order[];
}
