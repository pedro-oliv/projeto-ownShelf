import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from './jwt-auth.guard'

import { LibraryService } from './library.service'

import { UpdateFavoriteDto } from './dto/update-favorite.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { UpdateStatusDto } from './dto/update-status.dto'

@Controller('library')
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(
    private readonly libraryService: LibraryService,
  ) {}

  @Get()
  async getUserLibrary(
    @Req() req,
  ) {
    return this.libraryService.getUserLibrary(
      req.user.id,
    )
  }

  @Patch(':bookId/favorite')
  async favoriteBook(
    @Req() req,
    @Param('bookId') bookId: string,
    @Body() body: UpdateFavoriteDto,
  ) {
    return this.libraryService.favoriteBook(
      req.user.id,
      bookId,
      body.favorite,
    )
  }

  @Patch(':bookId/status')
  async updateStatus(
    @Req() req,
    @Param('bookId') bookId: string,
    @Body() body: UpdateStatusDto,
  ) {
    return this.libraryService.updateStatus(
      req.user.id,
      bookId,
      body.status,
    )
  }

  @Patch(':bookId/page')
  async updatePage(
    @Req() req,
    @Param('bookId') bookId: string,
    @Body() body: UpdatePageDto,
  ) {
    return this.libraryService.updateLastPage(
      req.user.id,
      bookId,
      body.page,
    )
  }
}
