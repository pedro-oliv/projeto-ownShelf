"use client"
import React, { useEffect, useRef, useState } from 'react'
import {ChevronDown, ShelvingUnit, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserPopUp from '../UserPopUp/UserPopUp';

const Navbar = () => {
    const [navbarExpandida, setNavbarExpandida] = useState<boolean>(false);
    const [conteudoNavExpandida, setConteudoNavExpandida] = useState<number>(0);
    const [moverSeta, setMoverSeta] = useState<boolean>(false);
    const [moverSeta2, setMoverSeta2] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    function expandirNavbar(numConteudo: number) {
        if (numConteudo == conteudoNavExpandida && navbarExpandida) {
            setNavbarExpandida(false)
        } else if (numConteudo != conteudoNavExpandida && navbarExpandida) {
            setConteudoNavExpandida(numConteudo);
        } else {
            setConteudoNavExpandida(numConteudo);
            setNavbarExpandida(true);
        }
    }

    const arrayConteudo = [(
        <div className='p-5 grid grid-cols-3 gap-4'>
            <div>
                <p>teste</p>
                <p>teste2</p>
                <p>teste3</p>
            </div>
        </div>),
    (<div className='p-5 grid grid-cols-3 gap-4'>
        <div>
            <p>bom dia</p>
            <p>boa tarde</p>
            <p>boa noite</p>
            <p>bom dia</p>
            <p>boa tarde</p>
            <p>boa noite</p>
        </div>
    </div>)
    ]

    useEffect(() => {
        function fecharNavbar(e: MouseEvent) {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setNavbarExpandida(false)
            }
        }
        document.addEventListener("mousedown", fecharNavbar)
        return () => document.removeEventListener("mousedown", fecharNavbar)
    }, [])

    return (
        <div ref={navRef} className='w-full bg-[#131416] fixed border-b-1 border-[#28292c]'>
            <div className='flex px-3 py-3 items-center justify-between'>
                <div className='flex items-center gap-x-8'>
                    <div className='px-4 cursor-pointer' onClick={() => router.push('/home')}>
                        <ShelvingUnit style={{ scale: '1.1' }} />
                    </div>
                    <div className={`flex rounded-sm relative py-1 px-2 ps-3 hover:bg-[#9d9ea5]/15 cursor-pointer transition delay-25 duration-120 ease-in select-none after:rounded-sm after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#f58142] after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 ${conteudoNavExpandida === 1 && navbarExpandida ? "after:scale-x-100" : "after:scale-x-0"}`}
                        onMouseMove={() => setMoverSeta(true)}
                        onMouseOut={() => setMoverSeta(false)} onClick={() => expandirNavbar(1)}>
                        Explorar
                        <ChevronDown className={`transition-all ease-in-out duration-100 ${moverSeta ? 'pt-1' : 'pt-0'}`} />
                    </div>
                    <div className={`flex rounded-sm relative py-1 px-2 ps-3 hover:bg-[#9d9ea5]/15 cursor-pointer transition delay-25 duration-120 ease-in select-none after:rounded-sm after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#f58142] after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 ${conteudoNavExpandida === 2 && navbarExpandida ? "after:scale-x-100" : "after:scale-x-0"}`}
                        onMouseMove={() => setMoverSeta2(true)}
                        onMouseOut={() => setMoverSeta2(false)}
                        onClick={() => expandirNavbar(2)}>
                        Categorias
                        <ChevronDown className={`transition-all ease-in-out duration-100 ${moverSeta2 ? 'pt-1' : 'pt-0'}`} />
                    </div>
                </div>
                <div className='flex items-center gap-6 pe-3'>
                    <ShoppingCart />
                    <UserPopUp />
                </div>
            </div>
            <div className={`px-2 absolute left-0 top-full w-full overflow-hidden transition-all ease-initial duration-200 ${navbarExpandida ? "max-h-100" : "max-h-0"} bg-[#131416] border-b-1 border-[#28292c]`}> {arrayConteudo[conteudoNavExpandida - 1]}
            </div>
        </div>
    )
}
export default Navbar