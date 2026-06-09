"use client"
import DashBoard from '@/app/components/DashBoard/DashBoard';
import { useEffect, useState } from "react";
import Button from "@/app/components/Button/Button";
import axios from 'axios';
import { useAuth } from '@/app/utils/contexts/AuthContext';
import { useLoading } from '@/app/utils/contexts/LoadingContext';

type Transaction = {
  id: string;
  status: string;
  createdAt: string;
  items: {
    id: string;
    bookId: string;
    unitPrice: number;
  }[];
};

function page() {
  const {user} = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadOrders() {

    const res = await axios.get(`http://localhost:3003/transactions/user/${user?.id}`);

    setTransactions(res.data);
  }

  useEffect(() => {
  if (!user?.id) return;

  loadOrders();
  }, [user?.id]);

  const {setLoading} = useLoading()

  async function handleUnlock(transactionId: string) {
    try {
      setLoading(true);

      await axios.post(
        `http://localhost:3003/transactions/${transactionId}/unlock`
      );

      loadOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Meus pedidos
      </h1>

      {transactions.map((t) => (
        <div
          key={t.id}
          className="border border-zinc-700 rounded-xl p-4 mb-4"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">
                Pedido #{t.id.slice(0, 6)}
              </p>

              <p className="text-sm text-zinc-400">
                Status: {t.status}
              </p>
            </div>

            {t.status === "PENDING" && (
              <Button
                texto="Unlock"
                funcao={() => handleUnlock(t.id)}
                tamanho="w-xs"
                background="laranja"
              />
            )}
          </div>

          <div className="mt-4">
            {t.items.map((item) => (
              <div key={item.id} className="text-sm">
                Livro ID: {item.bookId} - R$ {Number(item.unitPrice).toFixed(2).replace('.', ',')}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default page