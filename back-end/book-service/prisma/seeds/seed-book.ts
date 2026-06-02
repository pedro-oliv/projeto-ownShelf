import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const books = [
  {
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    publishYear: '1899',
    coverUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/dom-casmurro.jpg',
    pdfUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/dom-casmurro.pdf',
    price: '9.90',
  },
  {
    title: 'Iracema',
    author: 'José Alencar',
    publishYear: '1865',
    coverUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/iracema.jpg',
    pdfUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/iracema.pdf',
    price: '9.99'
  },
  {
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    publishYear: '1890',
    coverUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/o-corti%C3%A7o.jpg',
    pdfUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/o-cortico.pdf',
    price: '9.99'
  },
  {
    title: 'Drácula',
    author: 'Bram Stoker',
    publishYear: '1897',
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/dracula.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/dracula.pdf',
    price: '12.90',
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    publishYear: '1818',
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/frankenstein.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/frankenstein.pdf',
    price: '10.90',
  },
  {
    title: 'A Ilha do Tesouro',
    author: 'Robert Louis Stevenson',
    publishYear: '1883',
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/ilhatesouro.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/ilha+do+tesouro.pdf',
    price: '8.90',
  },
  {
    title: 'A Máquina do Tempo',
    author: 'H. G. Wells',
    publishYear: '1895',
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/timemachin.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/timemach.pdf',
    price: '7.90',
  },
  {
    title: 'A Guerra dos Mundos',
    author: 'H. G. Wells',
    publishYear: '1898',
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/warworlds.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/warofworlds.pdf',
    price: '9.90',
  },
  {
    title: 'As Aventuras de Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    publishYear: '1892',
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/sherlock.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/asaventurasdesherlockholmes.pdf',
    price: '11.90',
  },
];

async function main() {
  await prisma.book.createMany({
    data: books,
  });

  console.log(`${books.length} livros inseridos!`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });