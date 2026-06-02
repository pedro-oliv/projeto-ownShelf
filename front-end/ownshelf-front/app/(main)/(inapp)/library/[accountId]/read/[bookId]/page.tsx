
import PdfReader from '@/app/components/PdfReader/PdfReader';
import React from 'react'
import dynamic from 'next/dynamic';

async function page({params,}: {params: Promise<{ bookId: string | number}>}) {
  const idLivro = (await params).bookId;

  return (
    <div className='pt-7'><PdfReader idLivro={String(idLivro)}/></div>
  )
}

export default page