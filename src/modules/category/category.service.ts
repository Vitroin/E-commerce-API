import { Category, CategoryRepository } from '@models/index';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor (
    private readonly categoryRepository: CategoryRepository
  ){}

  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne(
      { slug: category.slug },
    );

    if (categoryExist) throw new ConflictException('Category already exists');
    return await this.categoryRepository.create(category);
  }

  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({slug: category.slug, _id: {$ne: id}});
    if (categoryExist) throw new ConflictException('Category already exists');
    return await this.categoryRepository.updateOne({_id: id}, category,{new : true});
  }
  
  async findOne(id: string) {
    const category = await this.categoryRepository.getOne(
      {_id: id},
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] });

    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
  

  // Todo
  async findAll(query: any) {
    return await this.categoryRepository.getAll(
      {},
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] },
      query
    );
  }



  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
