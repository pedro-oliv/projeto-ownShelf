"use client";

import Button from "../Button/Button";
import { addToCart } from "@/app/utils/cart";

type GridProps = {
  dados: any;
};

export default function GridLivros({ dados }: GridProps) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-8">
        Catálogo
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {dados.map((livro: any) => (
          <div
            key={livro.id}
            className="bg-[#131416] border border-[#28292c] rounded-2xl overflow-hidden hover:scale-[1.01] hover:border-zinc-600 transition-all duration-200 cursor-pointer"
          >
            <div className="w-full h-[420px] bg-[#0d0e10] flex items-center justify-center p-4">
              <img
                src={livro.coverUrl}
                alt={livro.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <h2 className="font-medium text-white line-clamp-2">
                  {livro.title}
                </h2>

                <p className="text-sm text-zinc-400">
                  {livro.author}
                </p>
              </div>

              <div className="flex flex-col gap-1 text-md">
                <p className="flex justify-end">
                  <span className="text-[#f58142] font-semibold">
                    R$ {Number(livro.price).toFixed(2).replace('.', ',')}
                  </span>
                </p>
              </div>

              <div>
                <Button
                  texto="Adicionar ao carrinho"
                  funcao={() =>
                    addToCart({
                      id: livro.id,
                      titulo: livro.title,
                      autor: livro.author,
                      preco: Number(livro.price),
                      capa: livro.coverUrl,
                    })
                  }
                  tamanho="w-full"
                  background="laranja"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}