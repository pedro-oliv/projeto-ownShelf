import {
  IsNumber,
  Min,
} from 'class-validator'

export class UpdatePageDto {
  @IsNumber()
  @Min(1)
  page!: number
}