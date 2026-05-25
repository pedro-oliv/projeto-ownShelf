import {LucideIcon, CircleX } from 'lucide-react'
import React from 'react'

interface InputTextoProps{
    onChange: any,
    blocked?: boolean,
    value: string,
    tamanho: "w-xs" | "w-sm" | "w-md" | "w-lg" | "w-full",
    background: "black" | "[#131416]",
    placeholder?: string
    label?: string
    type: "password" | "text"
    icon?: LucideIcon
    validado: boolean
    controlador: boolean
    quantidadeCaractereres?: number
    msgErro?: string
}

const InputTexto = (props: InputTextoProps) => {

  return (
    <div className='flex flex-col'>
    {props.label ? <label>{props.label}:</label> : <></>}
    <div className='relative transition-all duration-150 ease-in-out focus-within:scale-[1.01]'>
      {props.icon ? 
      <props.icon
      size={18}
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-zinc-400
        pointer-events-none
        z-10
      "
      /> : <></>}
    <input type={props.type} 
    maxLength={props.quantidadeCaractereres}
    className={`${props.tamanho} bg-${props.background} rounded-md text-white px-2 py-3 ${props.icon ? 'pl-11' : 'pl-4'} border ${props.validado ? (props.controlador ? 'border-green-400' : 'border-red-400') : 'border-[#28292c]'}  transition-all duration-150 ease-in-out focus:outline-none ${props.validado ? (props.controlador ? 'focus:border-green-400' : 'focus:border-red-400') : 'focus:border-white'} focus:shadow-lg`} 
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
    disabled={props.blocked}
    />
    </div>
    {(props.validado && !props.controlador && props.msgErro) && 
    <div className='flex text-red-400 items-center pt-1 text-sm'>
      <CircleX size={18}/>
      <label className='pl-1 text-wrap'>
        {props.msgErro}
        </label>
      </div>}
    </div>
  )
}

export default InputTexto