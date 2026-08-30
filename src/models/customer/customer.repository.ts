import { AbstractRepository } from '../abstract.repository';
import { Customer } from './customer.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerRepository extends AbstractRepository<Customer> {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {
    super(customerModel);
  }
}
