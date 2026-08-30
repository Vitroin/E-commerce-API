import { Types } from 'mongoose';

export class Category {
  readonly _id!: Types.ObjectId;
  name!: string;
  slug!: string;
  createBy!: Types.ObjectId;
  updatedBy!: Types.ObjectId;
  logo?: Object;
}
