import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../Products/products.entity';
import {v4 as uuid} from 'uuid';

@Entity({ name: 'orderdetails' })
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable({name: 'orderdetails_products'})
    products: Product[];
}
