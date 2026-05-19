"use client"
import Button from '@/app/components/Button/Button';
import InputTexto from '@/app/components/InputTexto/InputTexto';
import { useAuth } from '@/app/utils/contexts/AuthContext';
import { Util } from '@/app/utils/Util';
import { ShelvingUnit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");

  const router = useRouter();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErro("");

    if(!Util.validarEmail(email)){
        setErro("Email inválido")
        return
    }

    const success = await login(
      email,
      senha
    );


    if (success) {
      router.push("/home");
    } else {
      setErro("Email ou senha inválidos");
    }
  }

  return (
    <div className='flex grid place-items-center h-full'>
    
    <form
      onSubmit={handleLogin}
      className="w-full max-w-xl flex flex-col gap-4 p-12 pt-20 pb-15 rounded-2xl bg-[#131416] border border-[#28292c]"
    >
        <div className='flex items-center justify-center flex-col'>
            <ShelvingUnit style={{ scale: '3.0' }} />
           <h2 className='text-3xl font-medium pt-12'>OwnShelf</h2>
        </div>
      <div>
        <h1 className="text-2xl font-semibold">
          Entrar
        </h1>

        <p className="text-sm text-zinc-400">
          Faça login para continuar
        </p>
      </div>

      <InputTexto
        value={email}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) => setEmail(e.target.value)}
        placeholder="Email"
        type='text'
        background='black'
        tamanho='w-full'
      />

      <InputTexto
        value={senha}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) => setSenha(e.target.value)}
        placeholder="Senha"
        type="password"
        background='black'
        tamanho='w-full'
      />

      {erro && (
        <p className="text-red-500 text-sm">
          {erro}
        </p>
      )}

      <Button
        texto={
          loading
            ? "Entrando..."
            : "Entrar"
        }
        funcao={() => {console.log("senha: ", senha, " email: ", email)}}
        tamanho="w-full"
        background='preto'
      />

      <button
        type="button"
        className="text-sm text-zinc-400 hover:text-white transition cursor-pointer"
      >
        Criar conta
      </button>
    </form>
    </div>
  );
}

export default page