import React from 'react'

interface CartStepProps{
    onNext: any
}

const CartStep = (props: CartStepProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2">
    {/* itens */}
  </div>

  <div className="bg-[#131416] border border-[#28292c] rounded-2xl p-6 h-fit">
    <h2 className="font-semibold mb-4">
      Resumo
    </h2>

    <button
      onClick={props.onNext}
      className="w-full bg-[#f58142] py-3 rounded-md"
    >
      Continuar
    </button>
  </div>

</div>
  )
}

export default CartStep