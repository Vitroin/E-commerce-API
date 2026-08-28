import { AbstractRepository } from "@models/abstract.repository";
import { Brand } from "@modules/brand/entities/brand.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable() //services - repos - factories - helpers
export class BrandRepository extends AbstractRepository<Brand> {
    constructor( @InjectModel(Brand.name)private readonly brandModel: Model<Brand> ) 
    {
        super(brandModel);
    }
}