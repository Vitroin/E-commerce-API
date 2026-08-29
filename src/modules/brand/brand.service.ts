import { MESSAGE } from '@common/constant';
import { Brand, BrandRepository } from '@models/index';
import { ConflictException, Get, Injectable, Param } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Public } from '@common/decorators';

@Injectable()
export class BrandService {

  constructor(
    private readonly brandRepository: BrandRepository
  ) {}

  async create(brand: Brand) {
    const brandExist = await this.brandRepository.getOne( {slug: brand.slug})
    if(brandExist) throw new ConflictException( MESSAGE.Brand.alreadyExist);
    return await this.brandRepository.create(brand);
  }

  //Todo: brand Implement findAll, findOne, update and remove methods
  findAll() {
    return `This action returns all brand`;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
