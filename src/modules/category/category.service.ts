import { Category, CategoryRepository } from '@models/index';
import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor (
    private readonly categoryRepository: CategoryRepository
  ){}

  async create( category: Category) {
    
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });

    if (categoryExist) throw new ConflictException('Category already exists');
    return await this.categoryRepository.create(category);
  }

  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({slug: category.slug});
    if (categoryExist) throw new ConflictException('Category already exists');
    return await this.categoryRepository.updateOne({_id: id}, category,{new : true});
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }


  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
