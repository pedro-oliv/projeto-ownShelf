import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async searchBooks(query: string) {
    if (!query?.trim()) {
      return []
    }
    return this.prisma.book.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })
  }

  async landing() {
    const popular = await this.prisma.book.findMany({
      take: 9,
    })

    return {
      popular,
    }
  }

  async getBook(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    })

    if (!book) {
      throw new NotFoundException('Livro não encontrado.')
    }

    return book
  }

  async getBooks(ids: string[]) {
    return this.prisma.book.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }
}
