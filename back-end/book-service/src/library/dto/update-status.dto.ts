import {
  IsEnum,
} from 'class-validator'

import { ReadingStatus } from '@prisma/client'

export class UpdateStatusDto {
  @IsEnum(ReadingStatus)
  status!: ReadingStatus
}