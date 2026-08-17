import { Transform} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength,MaxLength, IsDate } from 'class-validator';

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    userName!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @Transform(({ value }) => {
        return new Date(value);
    })

    @IsDate()
    dob!: Date;


} 

