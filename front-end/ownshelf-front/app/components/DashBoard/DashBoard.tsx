"use client";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import Button from "../Button/Button";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Livro = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  pdfUrl: string;
};

type Props = {
  livros: Livro[];
};

export default function DashBoard({ livros }: Props) {

  const {user} = useAuth();

  const router = useRouter()

  function lerLivro(id: string) {
    router.push(`${user!.id}/read/${id}`);
  }

  async function baixarPDFComWatermark(pdfUrl: string, user: any, nomeArquivo: string) {
  // 1. baixa o PDF original
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

  // 2. carrega no pdf-lib
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();

  // 3. adiciona watermark em todas as páginas
  pages.forEach((page) => {
    const { width, height } = page.getSize();

    page.drawText(`User: ${user.email}`, {
      x: 20,
      y: 20,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.5,
    });

    page.drawText(`ID: ${user.id}`, {
      x: 20,
      y: 35,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.5,
    });
  });

  // 4. gera novo PDF
  const pdfBytes = await pdfDoc.save();

  // 5. cria download
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
  type: "application/pdf",
});
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

  function baixarPDF(livro: any) {

  baixarPDFComWatermark(
    livro.pdfUrl,
    user,
    `${livro.title}.pdf`
  );
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

              <div className="flex flex-col gap-2 mt-2">

                <Button
                  background="laranja"
                  funcao={() => lerLivro(livro.id)}
                  texto="Ler PDF"
                  tamanho="w-full"
                />

                <Button
                  background="preto"
                  funcao={() => baixarPDF(livro)}
                  texto="Baixar PDF"
                  tamanho="w-full"
                />

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}