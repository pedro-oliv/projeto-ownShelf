"use client";

import Button from "../Button/Button";

const livros = [
  {
    id: 1,
    nome: "Game of Thrones",
    precoFisico: 89.9,
    precoDigital: 39.9,
    imagem:
      "https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg",
  },
  {
    id: 2,
    nome: "1984",
    precoFisico: 39.9,
    precoDigital: 19.9,
    imagem:
      "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
  },
  {
    id: 3,
    nome: "Duna",
    precoFisico: 59.9,
    precoDigital: 27.9,
    imagem:
      "https://images-na.ssl-images-amazon.com/images/I/81zN7udGRUL.jpg",
  },
  {
    id: 4,
    nome: "Neuromancer",
    precoFisico: 44.9,
    precoDigital: 21.9,
    imagem:
      "https://images-na.ssl-images-amazon.com/images/I/91Bx5ilP+EL.jpg",
  },
  {
    id: 5,
    nome: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    precoFisico: 34.9,
    precoDigital: 14.9,
    imagem:
      "https://m.media-amazon.com/images/I/91GAAzBixYL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 6,
    nome: "O Hobbit",
    precoFisico: 42.9,
    precoDigital: 18.9,
    imagem:
      "https://images-na.ssl-images-amazon.com/images/I/91M9xPIf10L.jpg",
  },
];

export default function GridLivros() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-8">
        Catálogo
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {livros.map((livro) => (
          <div
            key={livro.id}
            className="bg-[#131416] border border-[#28292c] rounded-2xl overflow-hidden hover:scale-[1.01] hover:border-zinc-600 transition-all duration-200 cursor-pointer"
          >
            <div className="w-full h-[420px] bg-[#0d0e10] flex items-center justify-center p-4">
              <img
                src={livro.imagem}
                alt={livro.nome}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                                <h2 className="font-medium text-white line-clamp-2">
                                    {livro.nome}
                                </h2>

                                <p className="text-sm text-zinc-400">
                                    {livro.autor}
                                </p>
                            </div>

              <div className="flex flex-col gap-1 text-md">
                <p className="flex justify-end">
                  

                  <span className="text-[#f58142] font-semibold">
                    R$ {livro.precoDigital.toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="">
                <Button texto={"Adicionar ao carrinho"} funcao={undefined} tamanho="w-full" background="laranja"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}