import { IsEnum, IsNumber, IsString } from 'class-validator';


export class TransactionItemDto {
  @IsString()
  bookId!: string;

  @IsNumber()
  unitPrice!: number;
}