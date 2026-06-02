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

}
