import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category, CategoryRepository } from '@models/index';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryFactoryService {
  constructor(private readonly categoryReposity: CategoryRepository) {}

  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.createdBy = user._id;
    category.updatedBy = user._id;
    category.logo = createCategoryDto.logo;
    return category;
  }

  async UpdateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    user: any,
  ) {
    const oldCategory = await this.categoryReposity.getOne({ _id: id });
    if (!oldCategory) throw new NotFoundException('Category not found');
    const category = new Category();
    category.name = (updateCategoryDto.name as string) || oldCategory.name;
    category.slug = slugify(updateCategoryDto.name as string, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.updatedBy = user._id;
    category.logo = updateCategoryDto.logo || oldCategory.logo;
    return category;
  }
}
