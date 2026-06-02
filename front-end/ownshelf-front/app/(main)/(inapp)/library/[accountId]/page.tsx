"use client"
import DashBoard from '@/app/components/DashBoard/DashBoard';
import { useAuth } from '@/app/utils/contexts/AuthContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {

  const { user } = useAuth();
  const [livros, setLivros] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3002/library", {
      withCredentials:true
    })
    .then((response) => {
      setLivros(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])


  return (
    <div className='pt-7'><DashBoard livros={livros} /></div>
  )
}

export default page