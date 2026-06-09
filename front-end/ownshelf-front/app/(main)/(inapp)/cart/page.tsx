"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/app/utils/cart";
import Button from "@/app/components/Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useLoading } from "@/app/utils/contexts/LoadingContext";
import { useAlert } from "@/app/utils/contexts/AlertContext";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const {setLoading} = useLoading();
  const {showAlert} = useAlert();
  const {user} = useAuth();

  useEffect(() => {
    const data = localStorage.getItem("checkout-cart");

    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.preco,
    0
  );

  async function handleCheckout() {
    setLoading(true)
    try {
      

      const payload = {
        userId: user!.id,
        paymentType: "PIX",
        items: items.map((item) => ({
          bookId: item.id,
          unitPrice: item.preco,
        })),
      };

      await axios.post("http://localhost:3003/transactions", payload);

      localStorage.removeItem("checkout-cart");
      showAlert('Transação feita com sucesso!', "success")
      
      router.push("/home");
      setLoading(false)
    } catch (err) {
      console.error("Erro ao criar transaction", err);
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full justify-center">
    <div className="p-10 w-5xl">
      <h1 className="text-2xl font-bold mb-6">
        Checkout
      </h1>

      {items.map(item => (
        <div key={item.id} className="mb-4">
          <p>{item.titulo}</p>
          <p>R$ {item.preco.toFixed(2).replace('.', ',')}</p>
        </div>
      ))}

      <hr className="my-4" />


      <div className="flex justify-end">
      <h2 className="text-xl font-semibold">
        Total: R$ {total.toFixed(2).replace('.', ',')}
      </h2>
      </div>
      <div className="pt-4 flex justify-between">
        <Button texto={"Voltar"} funcao={() => router.push('/home')} tamanho={"w-xs"} background={"preto"} />
        <Button texto={"Finalizar compra"} funcao={() => handleCheckout()} tamanho={"w-xs"} background={"preto"} />
      </div>
    </div>
    </div>
  );
}