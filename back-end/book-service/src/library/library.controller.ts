import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from './jwt-auth.guard'

import { LibraryService } from './library.service'


@Controller('library')
export class LibraryController {
  constructor(
    private readonly libraryService: LibraryService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserLibrary(
    @Req() req,
  ) {
    return this.libraryService.getUserLibrary(
      req.user.id,
    )
  }

  
  @Post('/add')
  async addBooks(@Body() body: {
    userId: string;
    books: string[];
    transactionId: string;
  }) {
    return this.libraryService.addBooksToLibrary(
      body.userId,
      body.books,
      body.transactionId,
    );
  }

}
