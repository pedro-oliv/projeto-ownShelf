
import DashBoard from '@/app/components/DashBoard/DashBoard';
import React from 'react'

async function page({params,}: {params: Promise<{ accountId: string | number}>}) {
  const idConta = (await params).accountId;

  return (
    <div><DashBoard /></div>
  )
}

export default page