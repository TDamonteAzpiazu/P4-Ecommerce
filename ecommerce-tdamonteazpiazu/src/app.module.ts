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

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig]}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => configService.get('typeorm')}),
    UsersModule, ProductsModule, AuthModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}