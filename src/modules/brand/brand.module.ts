import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory/brand.factory';
import { Brand, BrandRepository, BrandSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
  controllers: [BrandController],
  providers: [BrandService,
              BrandFactoryService, 
              BrandRepository],
})
export class BrandModule {}
