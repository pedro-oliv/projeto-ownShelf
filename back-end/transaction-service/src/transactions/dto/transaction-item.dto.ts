import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum BookType {
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
}

export class TransactionItemDto {
  @IsString()
  bookId!: string;

  @IsEnum(BookType)
  type!: BookType;

  @IsNumber()
  unitPrice!: number;
}