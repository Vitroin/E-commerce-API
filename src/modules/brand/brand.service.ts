import { MESSAGE } from '@common/constant';
import { Brand, BrandRepository } from '@models/index';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {

  constructor(
    private readonly brandRepository: BrandRepository
  ) {}

  async create(brand: Brand) {
    const brandExist = await this.brandRepository.getOne( {slug: brand.slug})
    if(brandExist) throw new ConflictException( MESSAGE.Brand.alreadyExists);
    return await this.brandRepository.create(brand);
  }

  //Todo: brand Implement findAll, findOne, update and remove methods
  findAll() {
    return `This action returns all brand`;
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.getOne(
      {_id: id},
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] });

    if (!brand) throw new NotFoundException(MESSAGE.Brand.notFound);
    return brand;
  }
  

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
