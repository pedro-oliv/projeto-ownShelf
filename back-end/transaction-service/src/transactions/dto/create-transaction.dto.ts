import {
  IsArray,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { TransactionItemDto } from './transaction-item.dto';

export enum PaymentType {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BOLETO = 'BOLETO',
}

export class CreateTransactionDto {
  @IsString()
  userId!: string;

  @IsEnum(PaymentType)
  paymentType!: PaymentType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  items!: TransactionItemDto[];
}