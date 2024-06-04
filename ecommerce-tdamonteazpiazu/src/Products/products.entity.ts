import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from 'typeorm';
import { Category } from '../Categories/categories.entity';
import { OrderDetail } from '../OrderDetails/orderDetails.entity';
import {v4 as uuid} from 'uuid';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        description: 'El identificador unico del producto',
        example: '1b2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El nombre del producto',
        example: 'headphones',
    })
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false})
    name: string;

    @ApiProperty({
        description: 'La descripción del producto',
        example: 'Los headphones mas nuevos del mercado',
    })
    @Column({type:'text', nullable: false})
    description: string;

    @ApiProperty({
        description: 'El precio del producto',
        example: '100',
    })
    @Column('decimal', { precision: 10, scale: 2 , nullable: false})
    price: number;

    @ApiProperty({
        description: 'El stock del producto',
        example: '12',
    })
    @Column('int', { nullable: false})
    stock: number;

    @ApiProperty({
        description: 'La imagen del producto',
        example: 'default-image.jpg',
    })
    @Column({type: 'text', default: 'default-image.jpg'})
    imgUrl: string;

    @ApiProperty({
        description: 'La categoria del producto',
    })
    @ManyToOne(() => Category, category => category.products)
    category: Category | Category['id'];

    @ApiHideProperty()
    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetails: OrderDetail[];
}
