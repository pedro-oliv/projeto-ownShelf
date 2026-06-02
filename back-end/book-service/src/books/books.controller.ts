import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body
} from '@nestjs/common'

import { BooksService } from './books.service'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get('search')
  async searchBooks(
    @Query('query') query: string,
  ) {
    return this.booksService.searchBooks(query)
  }
  
  @Get('landing')
  async landing() {
    return this.booksService.landing()
  }

  @Get(':id')
  async getBook(
    @Param('id') id: string,
  ) {
    return this.booksService.getBook(id)
  }

  @Post('batch')
  async getBooks(
    @Body('ids') ids: string[],
  ) {
    return this.booksService.getBooks(ids)
  }
}