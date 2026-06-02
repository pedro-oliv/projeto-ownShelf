"use client"
import GridLivros from '@/app/components/GridLivros/GridLivros'
import { useLoading } from '@/app/utils/contexts/LoadingContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

const page = () => {

  const [livros, setLivros] = useState([]);

  const {setLoading} = useLoading()
  
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3002/books/landing')
    .then((response) => {
      console.log(response)
      setLivros(response.data.popular);
      setLoading(false)
    })
    .catch((e) => {
      console.log(e)
      setLoading(false)
    })
  }, [])
  
  return (
    <div className='pt-7'>
    <GridLivros dados={livros} />
    </div>
  )
}

export default page