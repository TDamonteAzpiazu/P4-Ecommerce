import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import typeOrmConfig from './config/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig]}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => configService.get('typeorm')}),
    UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}