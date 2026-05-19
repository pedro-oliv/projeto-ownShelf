"use client";

import Button from "../Button/Button";

const livros = [
    {
        id: 1,
        nome: "Memórias Póstumas de Brás Cubas",
        autor: "Machado de Assis",
        imagem:
            "https://m.media-amazon.com/images/I/91GAAzBixYL._UF1000,1000_QL80_.jpg",

        pdf: "/assets/memorias-postumas.pdf",
    },
];

export default function DashBoard() {

    function baixarPDF(pdf: string) {
        const link = document.createElement("a");

        link.href = pdf;

        link.download =
            "Memorias-Postumas-de-Bras-Cubas.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }

    function lerLivro(pdf: string) {
        window.open(pdf, "_blank");
    }

    return (
        <div className="w-full mt-3">

            <h1 className="text-3xl font-semibold mb-8">
                Biblioteca Digital
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                {livros.map((livro) => (
                    <div
                        key={livro.id}
                        className="bg-[#131416] border border-[#28292c] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-zinc-600 transition-all duration-200"
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

                            <div className="flex flex-col gap-2 mt-2">

                                <Button
                                    background="laranja"
                                    funcao={() => lerLivro(livro.pdf)}
                                    texto="Ler PDF"
                                    tamanho={"w-full"} />

                                <Button
                                    background="preto"
                                    funcao={() => baixarPDF(livro.pdf)}
                                    texto="Baixar PDF"
                                    tamanho={"w-full"} />

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}