import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Order } from '../Orders/orders.entity';
import {v4 as uuid} from 'uuid';
import { Role } from 'src/Roles/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
    @ApiProperty({
        description: 'El identificador unico del usuario',
        example: '1b2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El nombre del usuario',
        example: 'Tobías',
    })
    @Column({ type: 'varchar', length: 50, nullable: false})
    name: string;

    @ApiProperty({
        description: 'El correo del usuario',
        example: 'example@mail.com'
    })
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
    email: string;

    @ApiProperty({
        description: 'La contraseña hasheada del usuario',
        example: '$2b$10$V8ynIXCkEA7H9sPswoXClee5JZS19zsMDBFPHQFrD.lomKu2ePfHe'
    })
    @Column({type: 'varchar', length: 200 , nullable: false, select : false})
    password: string;

    @ApiProperty({
        description: 'El teléfono del usuario',
        example: '123456789'
    })
    @Column({ type: 'int', nullable: true })
    phone: number;

    @ApiProperty({
        description: 'El país del usuario',
        example: 'Colombia'
    })
    @Column({ type: 'varchar', length: 50 , nullable: true})
    country: string;

    @ApiProperty({
        description: 'La dirección del usuario',
        example: 'Calle 123'
    })
    @Column({ type: 'text' ,  nullable: true})
    address: string;

    @ApiProperty({
        description: 'La ciudad del usuario',
        example: 'Bogota'
    })
    @Column({ type: 'varchar', length: 50 , nullable: true})
    city: string;

    @ApiProperty({
        description: 'El rol del usuario',
        example: 'User'
    })
    @Column({ default: Role.User, select: false })
    role: Role;

    @ApiProperty({
        description: 'Todos los pedidos del usuario',
    })
    @OneToMany(() => Order, order => order.user)
    @JoinColumn()
    orders: Order[];
}
