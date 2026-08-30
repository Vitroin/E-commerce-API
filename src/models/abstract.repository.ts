import {
  Model,
  QueryFilter,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

/**
 * A generic repository that provides common database operations
 * for any Mongoose model.
 *
 * T represents the document type (e.g. User, Product, Order).
 */
export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }

  /**
   * Finds a single document that matches the given filter.
   */
  public async getOne(
    filter: QueryFilter<T>,
    projection: ProjectionType<T> = {},
    options: QueryOptions<T> = {},
  ) {
    return this.model.findOne(filter, projection, options);
  }

  public async getAll(
    filter: QueryFilter<T>,
    projection: ProjectionType<T> = {},
    options: QueryOptions<T> = {},
    query: { page?: number; limit?: number } = {},
  ) {
    const limit = Math.max(1, Number(query.limit) || 10);
    const page = Math.max(1, Number(query.page) || 1);
    const skip = (page - 1) * limit;

    options.limit = limit;
    options.skip = skip;

    return this.model.find(filter, projection, options);
  }

  public async updateOne(
    filter: QueryFilter<T>,
    updateQuery: UpdateQuery<T> = {},
    options: QueryOptions<T> = {},
  ) {
    return this.model.findOneAndUpdate(filter, updateQuery, options);
  }
}
