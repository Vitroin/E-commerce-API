import { Product } from '@models/index';
import { CreateProductDto } from '../dto/create-product.dto';
import slugify from 'slugify';
import { Types } from 'mongoose';

export class ProductFactoryService {
  createProduct(createProductDto: CreateProductDto, user: any) {
    const product = new Product();

    product.name = createProductDto.name;
    product.slug = slugify(createProductDto.name);
    product.description = createProductDto.description;

    product.categoryId = new Types.ObjectId(createProductDto.categoryId);
    product.brandId = new Types.ObjectId(createProductDto.brandId);
    product.updatedBy = user._id;
    product.createdBy = user._id;

    product.price = createProductDto.price;
    product.discountType = createProductDto.discountType;
    product.discountAmount = createProductDto.discountAmount;
    product.stock = createProductDto.stock;
    product.sold = 0;

    product.colors = createProductDto.colors;
    product.size = createProductDto.size;

    return product;
  }
}
