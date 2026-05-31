import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import {
  PrismaService,
} from '../prisma/prisma.service'

import {
  ReadingStatus,
} from '@prisma/client'

@Injectable()
export class LibraryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getUserLibrary(userId: string) {
    return this.prisma.library.findMany({
      where: {
        userId,
      },
      include: {
        book: true,
      },
    })
  }

  async favoriteBook(
    userId: string,
    bookId: string,
    favorite: boolean,
  ) {
    const library = await this.prisma.library.findFirst({
      where: {
        userId,
        bookId,
      },
    })

    if (!library) {
      throw new NotFoundException('Livro não encontrado na biblioteca.')
    }

    return this.prisma.library.update({
      where: {
        id: library.id,
      },
      data: {
        favorite,
      },
    })
  }

  async updateStatus(
    userId: string,
    bookId: string,
    status: ReadingStatus,
  ) {
    const library = await this.prisma.library.findFirst({
      where: {
        userId,
        bookId,
      },
    })

    if (!library) {
      throw new NotFoundException('Livro não encontrado na biblioteca.')
    }

    return this.prisma.library.update({
      where: {
        id: library.id,
      },
      data: {
        readingStatus: status,
      },
    })
  }

  async updateLastPage(
    userId: string,
    bookId: string,
    page: number,
  ) {
    const library = await this.prisma.library.findFirst({
      where: {
        userId,
        bookId,
      },
    })

    if (!library) {
      throw new NotFoundException('Livro não encontrado na biblioteca.')
    }

    return this.prisma.library.update({
      where: {
        id: library.id,
      },
      data: {
        lastPage: page,
      },
    })
  }
}