import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../Users/users.entity';
import { OrderDetail } from '../OrderDetails/orderDetails.entity';
import {v4 as uuid} from 'uuid';

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column('date')
    date: Date;

    @OneToOne(() => OrderDetail, { cascade: true , onDelete: 'CASCADE' })
    @JoinColumn()
    orderDetail: OrderDetail;
}
