import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import {
  PrismaService,
} from '../prisma/prisma.service'

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

  async addBooksToLibrary(
  userId: string,
  books: string[],
  transactionId: string,
) {
  await this.prisma.library.createMany({
    data: books.map(bookId => ({
      userId,
      bookId,
      transactionId,
    })),
  });
}

}