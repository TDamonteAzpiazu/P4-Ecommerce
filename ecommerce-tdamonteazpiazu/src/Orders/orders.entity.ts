import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../Users/users.entity';
import { OrderDetail } from '../OrderDetails/orderDetails.entity';
import {v4 as uuid} from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'orders'})
export class Order {
    @ApiProperty({
        description: 'El identificador unico de la orden',
        example: '1b2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El usuario que hace la orden',
    })
    @ManyToOne(() => User, user => user.orders, { onDelete: 'SET NULL' })
    @JoinColumn()
    user: User;

    @ApiProperty({
        description: 'La fecha de la orden',
        example: '2022-01-01',
    })
    @Column('date')
    date: Date;

    @ApiProperty({
        description: 'El detalle de la orden',
    })
    @OneToOne(() => OrderDetail)
    @JoinColumn()
    orderDetail: OrderDetail;
}
