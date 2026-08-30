import { Auth, Public, User } from '@common/decorators';
import { CategoryFactoryService } from './factory';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: any,
  ) {
    const category = this.categoryFactoryService.createCategory(
      createCategoryDto,
      user,
    );
    const createdCategory = await this.categoryService.create(category);
    return {
      success: true,
      message: 'Category created successfully',
      data: { createdCategory },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: any,
  ) {
    const category = await this.categoryFactoryService.UpdateCategory(
      id,
      updateCategoryDto,
      user,
    );
    const updatedCategory = await this.categoryService.update(id, category);
    return {
      success: true,
      message: 'Category updated successfully',
      data: { updatedCategory },
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      success: true,
      message: 'Category found successfully',
      data: { category },
    };
  }

  // Todo
  @Get()
  async findAll(@Query() query: any) {
    const categories = await this.categoryService.findAll(query);
    return {
      success: true,
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
