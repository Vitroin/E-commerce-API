import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "@models/index";
import slugify from "slugify";

@Injectable()
export class CategoryFactoryService{
    createCategory( createCategoryDto: CreateCategoryDto, user:any){
        const category = new Category();
        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, {
            replacement: '-',
            lower: true,
            trim: true
        } );
        category.createdBy = user._id;
        category.logo = createCategoryDto.logo;
        return category;


    }
}

