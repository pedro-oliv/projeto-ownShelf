'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfReaderProps {
  idLivro: string;
}

export default function PdfReader({
  idLivro
}: PdfReaderProps) {

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setpdf] = useState("")

  const [pageWidth, setPageWidth] = useState(400);

  useEffect(() => {
    const updateWidth = () => {

      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        setPageWidth(screenWidth - 32);
      }
      else if (screenWidth < 1024) {
        setPageWidth(screenWidth * 0.8);
      }
      else {
        setPageWidth(Math.min(screenWidth * 0.7, 1000));
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () =>
      window.removeEventListener('resize', updateWidth);

  }, []);

  const [pageHeight, setPageHeight] = useState(1000);

useEffect(() => {
      const updateHeight = () => {

      const screenHeight = window.innerHeight;

      if (screenHeight < 640) {
        setPageHeight(screenHeight - 32);
      }
      else if (screenHeight < 1024) {
        setPageHeight(screenHeight * 0.9);
      }
      else {
        setPageHeight(Math.min(screenHeight * 0.8, 1000));
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () =>
      window.removeEventListener('resize', updateHeight);
}, []);

useEffect(() => {
  axios.get(`http://localhost:3002/books/${idLivro}`)
  .then((response) => {
    setpdf(response.data)
  })
  .catch((e) => {
    console.log(e)
  })
}, [])
 
  return (
    <div className="flex flex-col items-center py-6">

      <div className="relative">

        {/* Área esquerda */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 z-10 cursor-pointer"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(prev => prev - 1);
            }
          }}
        />

        {/* Área direita */}
        <div
          className="absolute right-0 top-0 h-full w-1/2 z-10 cursor-pointer"
          onClick={() => {
            if (pageNumber < numPages) {
              setPageNumber(prev => prev + 1);
            }
          }}
        />
        <Document
          file={pdf}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
        >
          <Page
            pageNumber={pageNumber}
            height={800}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      <div className="mt-4 text-sm text-zinc-400">
        Página {pageNumber} de {numPages}
      </div>

    </div>
  );
}