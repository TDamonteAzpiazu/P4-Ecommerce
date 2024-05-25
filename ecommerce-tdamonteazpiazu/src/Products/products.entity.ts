import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../Categories/categories.entity';
import { OrderDetail } from '../OrderDetails/orderDetails.entity';
import {v4 as uuid} from 'uuid';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50 })
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    stock: number;

    @Column({ default: 'default-image.jpg' , nullable: true})
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products)
    category: Category | Category['id'];

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[];
}
