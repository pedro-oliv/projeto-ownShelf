import React from 'react'
interface ButtonProps{ 
    texto: string, 
    funcao: any, 
    tamanho: "w-xs" | "w-sm" | "w-md" | "w-lg" | "w-full" 
    background: "preto" | "cinza" | "laranja"
} 
    
const Button = (props: ButtonProps) => { 

    const cores = {
        laranja: "bg-[#EC6F2D] hover:bg-[#EC6F2D]-800 text-white border border-[#8b8d93] font-semibold",
        preto: "bg-black hover:bg-black-800 text-white border border-[#28292c]",
        cinza: "bg-[#131416] hover:bg-[#131416] text-white border border-[#28292c]"
    }
    
    return (
    <button 
    className={`${props.tamanho} rounded-xl ${cores[props.background]} py-2 hover:opacity-70 transition cursor-pointer ` } 
    onClick = {props.funcao}> { props.texto }</button> 
) 
} 
    
export default Button