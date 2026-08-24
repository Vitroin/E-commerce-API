import { Auth, User } from '@common/decorators';
import { CategoryFactoryService } from './factory';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService      
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @User() user:any) {
    const category = this.categoryFactoryService.createCategory(createCategoryDto, user)
    const createdCategory = await this.categoryService.create(category);
    return {
      sucess: true,
      message: 'Category created successfully',
      data: {createdCategory}
    }
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
