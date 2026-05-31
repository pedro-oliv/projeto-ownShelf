import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const books = [
  {
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    synopsis:
      'Bentinho relembra sua juventude, seu amor por Capitu e os acontecimentos que o levaram a questionar a fidelidade de sua esposa.',
    categories: [
      'Romance',
      'Literatura Brasileira',
      'Clássico',
    ],
    publishYear: '1899',
    physicalStock: 15,
    coverUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/dom-casmurro.jpg',
    pdfUrl:
      'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/dom-casmurro.pdf',
    totalPages: 177,
    physicalPrice: '39.90',
    digitalPrice: '9.90',
  },
  {
    title: 'Iracema',
    author: 'José Alencar',
    synopsis:
        'Iracema, uma jovem indígena da tribo tabajara, apaixona-se por Martim, um colonizador português. O relacionamento entre os dois enfrenta conflitos culturais, rivalidades entre tribos e os desafios da colonização do Brasil. A obra é considerada um dos principais romances do Romantismo brasileiro e uma representação simbólica da formação do povo brasileiro.',
    categories: [
        'Romance',
        'Literatura Brasileira',
        'Romantismo',
        'Ficção Histórica',
        'Clássico'
    ],
    publishYear: '1865',
    physicalStock: 0,
    coverUrl:
        'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/iracema.jpg',
    pdfUrl:
        'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/iracema.pdf',
    totalPages: 84,
    physicalPrice: '19.99',
    digitalPrice: '9.99'
  },
  {
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    synopsis:
        'A obra retrata a vida dos moradores de um cortiço no Rio de Janeiro do século XIX. Por meio de diversos personagens, o romance explora questões sociais, desigualdade, ambição, preconceito e as influências do ambiente sobre o comportamento humano. Considerado um marco do Naturalismo brasileiro, o livro apresenta uma crítica contundente à sociedade da época.',
    categories: [
        'Romance',
        'Literatura Brasileira',
        'Naturalismo',
        'Drama',
        'Clássico'
    ],
    publishYear: '1890',
    physicalStock: 2,
    coverUrl:
        'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/o-corti%C3%A7o.jpg',
    pdfUrl:
        'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/o-cortico.pdf',
    totalPages: 161,
    physicalPrice: '19.99',
    digitalPrice: '9.99'
  }
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