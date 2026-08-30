import { AbstractRepository } from '../abstract.repository';
import { Seller } from './seller.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SellerRepository extends AbstractRepository<Seller> {
  constructor(@InjectModel(Seller.name) sellerModel: Model<Seller>) {
    super(sellerModel);
  }
}
