import { Product, ProductRepository } from '@models/index';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { MESSAGE } from '@common/constant';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ){}


  async create(product: Product) {
    const [productExist] = await Promise.all([
      this.productRepository.getOne({ slug: product.slug }),
      this.brandService.findOne(product.brandId.toString()),
      this.categoryService.findOne(product.categoryId.toString()),
    ]);

    if (productExist) throw new ConflictException(MESSAGE.Product.alreadyExists);

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
