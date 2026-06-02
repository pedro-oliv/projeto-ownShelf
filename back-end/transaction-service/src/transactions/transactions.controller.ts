import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly service: TransactionsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateTransactionDto,
  ) {
    return this.service.create(dto);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
  ) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: any },
  ) {
    return this.service.updateStatus(
      id,
      body.status,
    );
  }

  @Post(':id/unlock')
  async unlock(@Param('id') id: string) {
    return this.service.unlockTransaction(id);
  }
}