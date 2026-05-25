"use client"
import Button from '@/app/components/Button/Button'
import InputTexto from '@/app/components/InputTexto/InputTexto'
import LoneAlert from '@/app/components/LoneAlert/LoneAlert'
import { dispatchAlert } from '@/app/utils/AlertEmitter'
import api from '@/app/utils/Api'
import { useAuth } from '@/app/utils/contexts/AuthContext'
import { useLoading } from '@/app/utils/contexts/LoadingContext'
import { Util } from '@/app/utils/Util'
import { KeySquare, Mail, ShelvingUnit, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("")
    const [validarNome, setValidarNome] = useState<boolean>(false)
    const [controladorNome, setControladorNome] = useState<boolean>(false);
    const [msgErroNome, setMsgErroNome] = useState<string>('')
    const [validarEmail, setValidarEmail] = useState<boolean>(false)
    const [validarSenha, setValidarSenha] = useState<boolean>(false)
    const [controladorEmail, setControladorEmail] = useState<boolean>(false);
    const [controladorSenha, setControladorSenha] = useState<boolean>(false);
    const [msgErroEmail, setMsgErroEmail] = useState<string>('')
    const [msgErroSenha, setMsgErroSenha] = useState<string>('')

    const [alertVisible, setAlertVisible] = useState(false);

    const { setLoading } = useLoading()

    const { login } = useAuth();

    const router = useRouter();

    function validar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if ((email == '' || senha == '' || nome == '') && (!validarEmail || !validarSenha || !validarNome)) {
            setValidarEmail(true)
            setValidarSenha(true)
            setValidarNome(true)
            setMsgErroEmail('Digite seu email.')
            setMsgErroSenha('Digite sua senha.')
            setMsgErroNome('Digite seu Nome')
            return
        }

        if (controladorEmail && controladorSenha && controladorNome) {
            createUser();
        }

    }

    useEffect(() => {
    
        if(!validarEmail){
          if(email != ''){
            setValidarEmail(true)
          }
        } else if(validarEmail){
          if(email == ''){
            setValidarEmail(false)
          }
        }
    
        if(!validarSenha){
          if(senha != ''){
            setValidarSenha(true)
          }
        } else if(validarSenha){
          if(senha == ''){
            setValidarSenha(false)
          }
        }

        if(!validarNome){
          if(nome != ''){
            setValidarNome(true)
          }
        } else if(validarNome){
          if(nome == ''){
            setValidarNome(false)
          }
        }
    
        if(email != '' && Util.validarEmail(email)){
          setControladorEmail(true)
          setMsgErroEmail('')
        }
        if(email == '' || !Util.validarEmail(email)){
          setControladorEmail(false)
          setMsgErroEmail('Digite um email válido.')
        }
        if(senha != '' && Util.validarSenha(senha)){
          setControladorSenha(true)
          setMsgErroSenha('')
        }
        if(senha == '' || !Util.validarSenha(senha)){
          setControladorSenha(false)
          setMsgErroSenha('A senha precisa ter no mínimo 8 caracteres, 1 número e 1 caractere especial.')
        }

        if(nome != '' && nome.length >= 2){
            setControladorNome(true)
            setMsgErroNome('')
        }
        if(nome.length < 2){
            setControladorNome(false)
            setMsgErroNome('Nome deve ter no mínimo 2 caracteres.')
        }
    
      }, [email, senha, nome])

    async function createUser() {
        setLoading(true)
        await api.post('/users/auth/register', { email: email, senha: senha, nome: nome })
            .then((response) => {
                setLoading(false)
                console.log(response)
                setAlertVisible(true)
                dispatchAlert(response.data.sucesso.message, 'success')
                setTimeout(() => {
                    setAlertVisible(false)
                }, 3000)
                login(email, senha)

            })
            .catch((e) => {
                console.log(e)
                setLoading(false)
                setAlertVisible(true)
                dispatchAlert(e.response.data.message, 'error')
                setTimeout(() => {
                    setAlertVisible(false)
                }, 3000)
            })
    }

    return (
        <div className='flex grid place-items-center h-full'>

            <form
                onSubmit={validar}
                className="w-full max-w-xl flex flex-col gap-4 p-12 pt-20 pb-15 rounded-2xl bg-[#131416] border border-[#28292c]"
            >
                <div className='flex items-center justify-center flex-col'>
                    <ShelvingUnit style={{ scale: '3.0', cursor:'pointer' }} onClick={() => router.push('/home')}/>
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
                    label='Nome'
                    value={nome}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setNome(e.target.value)}
                    placeholder="Nome"
                    type='text'
                    background='black'
                    tamanho='w-full'
                    validado={validarNome}
                    controlador={controladorNome}
                    icon={User}
                    msgErro={msgErroNome}
                />

                <InputTexto
                    label='Email'
                    value={email}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setEmail(e.target.value)}
                    placeholder="Email"
                    type='text'
                    background='black'
                    tamanho='w-full'
                    validado={validarEmail}
                    controlador={controladorEmail}
                    icon={Mail}
                    msgErro={msgErroEmail}
                />

                <InputTexto
                    label='Senha'
                    value={senha}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setSenha(e.target.value)}
                    placeholder="Senha"
                    type="password"
                    background='black'
                    tamanho='w-full'
                    controlador={controladorSenha}
                    validado={validarSenha}
                    icon={KeySquare}
                    quantidadeCaractereres={20}
                    msgErro={msgErroSenha}
                />
                <div
                    className={`
                    overflow-hidden
                    transition-all
                    duration-150
                    ease-in-out

                    ${alertVisible
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                        }
                    `}>
                    <LoneAlert />
                </div>
                <Button
                    texto={"Criar Conta"}
                    funcao={() => { }}
                    tamanho="w-full"
                    background='preto'
                />
            </form>
        </div>
    )
}

export default page