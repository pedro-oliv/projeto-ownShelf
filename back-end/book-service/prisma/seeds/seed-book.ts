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
  },
  {
    title: 'Drácula',
    author: 'Bram Stoker',
    synopsis:
      'O conde Drácula deixa a Transilvânia e inicia uma série de eventos sombrios que colocam diversas vidas em perigo.',
    categories: [
      'Terror',
      'Fantasia',
      'Clássico',
    ],
    publishYear: '1897',
    physicalStock: 18,
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/dracula.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/dracula.pdf',
    totalPages: 142,
    physicalPrice: '49.90',
    digitalPrice: '12.90',
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    synopsis:
      'Um jovem cientista desafia os limites da vida e cria uma criatura que mudará seu destino para sempre.',
    categories: [
      'Terror',
      'Ficção Científica',
      'Clássico',
    ],
    publishYear: '1818',
    physicalStock: 15,
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/frankenstein.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/frankenstein.pdf',
    totalPages: 228,
    physicalPrice: '44.90',
    digitalPrice: '10.90',
  },
  {
    title: 'A Ilha do Tesouro',
    author: 'Robert Louis Stevenson',
    synopsis:
      'Jim Hawkins encontra um mapa do tesouro e embarca em uma perigosa aventura repleta de piratas.',
    categories: [
      'Aventura',
      'Ação',
      'Clássico',
    ],
    publishYear: '1883',
    physicalStock: 20,
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/ilhatesouro.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/ilha+do+tesouro.pdf',
    totalPages: 627,
    physicalPrice: '39.90',
    digitalPrice: '8.90',
  },
  {
    title: 'A Máquina do Tempo',
    author: 'H. G. Wells',
    synopsis:
      'Um cientista constrói uma máquina capaz de viajar através do tempo e descobre o futuro da humanidade.',
    categories: [
      'Ficção Científica',
      'Aventura',
      'Clássico',
    ],
    publishYear: '1895',
    physicalStock: 17,
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/timemachin.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/timemach.pdf',
    totalPages: 73,
    physicalPrice: '34.90',
    digitalPrice: '7.90',
  },
  {
    title: 'A Guerra dos Mundos',
    author: 'H. G. Wells',
    synopsis:
      'A Terra é invadida por marcianos tecnologicamente superiores, desencadeando uma luta pela sobrevivência.',
    categories: [
      'Ficção Científica',
      'Ação',
      'Clássico',
    ],
    publishYear: '1898',
    physicalStock: 16,
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/warworlds.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/warofworlds.pdf',
    totalPages: 220,
    physicalPrice: '42.90',
    digitalPrice: '9.90',
  },
  {
    title: 'As Aventuras de Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    synopsis:
      'Uma coletânea de casos investigados pelo famoso detetive Sherlock Holmes e seu companheiro Watson.',
    categories: [
      'Mistério',
      'Suspense',
      'Clássico',
    ],
    publishYear: '1892',
    physicalStock: 20,
    coverUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/capas/sherlock.jpg',
    pdfUrl: 'https://ownshelf-storage-227755136901-sa-east-1-an.s3.sa-east-1.amazonaws.com/pdfs/asaventurasdesherlockholmes.pdf',
    totalPages: 307,
    physicalPrice: '46.90',
    digitalPrice: '11.90',
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