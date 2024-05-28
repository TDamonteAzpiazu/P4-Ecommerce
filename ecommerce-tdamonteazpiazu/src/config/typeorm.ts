import { registerAs } from "@nestjs/config"
import {config as dotenvConfig} from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"
// import { Category } from "src/Categories/categories.entity"
// import { OrderDetail } from "src/OrderDetails/orderDetails.entity"
// import { Order } from "src/Orders/orders.entity"
// import { Product } from "src/Products/products.entity"
// import { User } from "src/Users/users.entity"

dotenvConfig({path: '.development.env'})

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // entities: [User, Category, Product, Order, OrderDetail],
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: ["error"],
    // dropSchema:true
}

export default registerAs('typeorm', () => config)
export const connectSource = new DataSource(config as DataSourceOptions)