import { CircleUserRound } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/utils/contexts/AuthContext';

export const UserPopUp = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { user, logout } = useAuth();

    if (!user || user == null) {
        return (
            <div className="relative" ref={menuRef}>

                <button onClick={() => setOpen(!open)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition cursor-pointer" >
                    <CircleUserRound style={{ scale: "1.6" }} />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#131416] shadow-xl border border-[#28292c] p-4 z-50">
                        <div className="mb-4">
                            <h2 className="font-semibold text-lg">
                                Bem-vindo
                            </h2>
                            <p className="text-sm">
                                Entre na sua conta para continuar
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                texto={'Entrar'}
                                funcao={() => router.push('/login')}
                                tamanho={'w-full'}
                                background='preto' />
                            <Button
                                texto={'Criar conta'}
                                funcao={() => router.push('/register')}
                                tamanho={'w-full'}
                                background='preto' />
                        </div>
                    </div>)}
            </div>
        )
    } else if (user) {
        return (
            <div className="relative" ref={menuRef}>
                <button onClick={() => setOpen(!open)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition cursor-pointer" >
                    <CircleUserRound style={{ scale: "1.6" }} />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#131416] shadow-xl border border-[#28292c] p-4 z-50">
                        <h2 className="font-semibold text-lg">
                            Bem-vindo, {user.nome}
                        </h2>
                        <div className='flex gap-2 flex-col pt-2'>
                            <Button
                                texto='Biblioteca Digital'
                                funcao={() => { router.push(`/library/${user.id}`) }}
                                tamanho='w-full'
                                background='preto' />
                            <Button
                                texto='Pedidos'
                                funcao={() => { router.push(`/orders/${user.id}`)}}
                                tamanho='w-full'
                                background='preto' />
                            <Button
                                texto={'Sair'}
                                funcao={logout}
                                tamanho={'w-full'}
                                background='preto' />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default UserPopUp