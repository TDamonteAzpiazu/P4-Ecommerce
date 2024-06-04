import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../Products/products.entity';
import {v4 as uuid} from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orderdetails' })
export class OrderDetail {
    @ApiProperty({
        description: 'El identificador unico de la orden',
        example: '1b2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El precio de la orden',
        example: '1000',
    })
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ApiProperty({
        description: 'Los productos que vienen en la orden',
    })
    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable({name: 'orderdetails_products'})
    products: Product[];
}
