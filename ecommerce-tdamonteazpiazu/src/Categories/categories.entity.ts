import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Products/products.entity';
import {v4 as uuid} from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
    @ApiProperty({
        description: 'El identificador unico de la categoria',
        example: '1b2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El nombre de la categoria',
        example: 'headphones',
    })
    @Column({type: 'varchar', length: 50, unique: true, nullable: false})
    name: string;

    @ApiProperty({
        description: 'Los productos pertenecientes a la categoria',
    })
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
