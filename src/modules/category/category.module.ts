import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategoryRepository, CategorySchema } from '@models/index';
import { CategoryFactoryService } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository,CategoryFactoryService, JwtService],
})
export class CategoryModule {}
