import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({ timestamps: true, _id: false })
export class ProductCart{
    @Prop({ type: SchemaTypes.ObjectId, ref: 'product' })
    productId!: Types.ObjectId;
    @Prop({ default: 1, })
    quantity!: number;
}

@Schema({ timestamps: true })
export class Cart{
    readonly _id!: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'customer' })
    userId?: Types.ObjectId;

    @Prop( {type: [ProductCart], default: [] })
    products?: ProductCart[]
}

export const cartSchema = SchemaFactory.createForClass(Cart);