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
}

const InputTexto = (props: InputTextoProps) => {

  return (
    <div>
    <label>{props.label}</label>
    <input type={props.type} 
    className={`${props.tamanho} bg-${props.background} rounded-md text-white px-2 py-3 pl-4 border border-[#28292c]`} 
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
    disabled={props.blocked}
    />
    </div>
  )
}

export default InputTexto