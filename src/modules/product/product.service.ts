import { Product, ProductRepository } from '@models/index';
import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ){}


  async create(product: Product) {
    await this.brandService.findOne(product.brandId.toString());
    await this.categoryService.findOne(product.categoryId.toString()); 
    return await this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
