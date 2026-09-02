import { Transform } from "class-transformer";
import { IsInt, IsMongoId, IsOptional, Min } from "class-validator";

export class AddToCartDto {
    @IsMongoId()
    productId!: string;

    @IsInt()
    @Min(0)
    quantity!: number;
}
