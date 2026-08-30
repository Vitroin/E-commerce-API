import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory/brand.factory';
import { Auth, Public, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('brand')
@Auth(['Admin'])
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactoryService: BrandFactoryService,
  ) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
    const brand = this.brandFactoryService.createBrand(createBrandDto, user);
    const createdBrand = await this.brandService.create(brand);
    return {
      success: true,
      message: 'Brand created successfully',
      data: createdBrand,
    };
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id);
    return {
      success: true,
      message: MESSAGE.Brand.Found,
      data: { brand },
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
