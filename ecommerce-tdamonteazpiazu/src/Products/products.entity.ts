import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../Categories/categories.entity';
import { OrderDetail } from '../OrderDetails/orderDetails.entity';
import {v4 as uuid} from 'uuid';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false})
    name: string;

    @Column({type:'text', nullable: false})
    description: string;

    @Column('decimal', { precision: 10, scale: 2 , nullable: false})
    price: number;

    @Column('int', { nullable: false})
    stock: number;

    @Column({type: 'text', default: 'default-image.jpg'})
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products)
    category: Category | Category['id'];

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetails: OrderDetail[];
}
