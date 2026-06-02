/* import {
  Controller,
} from '@nestjs/common';

import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import { LibraryService } from '../library/library.service';

@Controller()
export class BookConsumer {
  constructor(
    private readonly booksService: LibraryService,
  ) {}

  @EventPattern('transaction.paid')
  async handleTransactionPaid(
    @Payload()
    data: {
      transactionId: string;
      userId: string;
      books: string[];
    },
  ) {
    await this.booksService.addBooksToLibrary(
      data.userId,
      data.books,
      data.transactionId,
    );
  }
} */