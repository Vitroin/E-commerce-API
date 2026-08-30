import { MESSAGE } from '@common/constant';
import { Product, ProductRepository } from '@models/index';
import { BrandService } from '@modules/brand/brand.service';
import { CategoryService } from '@modules/category/category.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}

  async create(product: Product, user: any) {
    const [existingProduct] = await Promise.all([
      this.productRepository.getOne({ slug: product.slug }),
      this.brandService.findOne(product.brandId.toString()),
      this.categoryService.findOne(product.categoryId.toString()),
    ]);

    if (existingProduct) {
      const isOwner =
        existingProduct.createdBy.equals(user._id) ||
        existingProduct.updatedBy.equals(user._id);

      if (isOwner) {
        return this.update(existingProduct._id.toString(), product);
      }

      throw new ConflictException(MESSAGE.Product.alreadyExists);
    }

    return this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string) {
    const product = await this.productRepository.getOne({ _id: id });
    if (!product) throw new NotFoundException(MESSAGE.Product.notFound);
    return product;
  }

  async update(id: string, product: Product) {
    const productExist = await this.findOne(id);

    // if (product.stock !== undefined) {
    //   product.stock = (productExist.stock ?? 0) + product.stock;
    // }

    // if (product.colors) {
    //   const colors = new Set<string>(productExist.colors ?? []);
    //   for (const color of product.colors) {
    //     colors.add(color);
    //   }
    //   product.colors = Array.from(colors);
    // }

    // if (product.size) {
    //   const sizes = new Set<string>(productExist.size ?? []);
    //   for (const size of product.size) {
    //     sizes.add(size);
    //   }
    //   product.size = Array.from(sizes);
    // }

    return this.productRepository.updateOne({ _id: id }, product, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // addToSet(newData: string[], oldData: string[]) {
  //   const items = new Set<string>(oldData ?? []);
  //   for (const item of newData) {
  //     items.add(item);
  //   }
  //   return items
  // }
}
