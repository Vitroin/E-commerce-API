import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, User } from '@common/decorators';
import { ProductFactoryService } from './factory/product.factory';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { MESSAGE } from '@common/constant';

@Controller('product')
@Auth(['Admin','Seller'])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactoryService: ProductFactoryService,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product =  this.productFactoryService.createProduct(createProductDto, user);
    const createdProduct = await this.productService.create(product);

    return{
      success: true,
      message: MESSAGE.Product.created,
      data: {createdProduct}
    }

  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
