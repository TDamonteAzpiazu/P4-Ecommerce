import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Products/products.entity';
import {v4 as uuid} from 'uuid';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50 })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
