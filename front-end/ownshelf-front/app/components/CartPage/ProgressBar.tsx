function ProgressBar({ step }: {
  step: number;
}) {
  return (
    <div className="flex items-center justify-center mb-10">

      <div className={`
        px-4 py-2 rounded-full
        ${step >= 1
          ? 'bg-[#f58142]'
          : 'bg-zinc-800'}
      `}>
        Carrinho
      </div>

      <div className="w-20 h-[2px] bg-zinc-700" />

      <div className={`
        px-4 py-2 rounded-full
        ${step >= 2
          ? 'bg-[#f58142]'
          : 'bg-zinc-800'}
      `}>
        Entrega
      </div>

      <div className="w-20 h-[2px] bg-zinc-700" />

      <div className={`
        px-4 py-2 rounded-full
        ${step >= 3
          ? 'bg-[#f58142]'
          : 'bg-zinc-800'}
      `}>
        Pagamento
      </div>

    </div>
  );
}