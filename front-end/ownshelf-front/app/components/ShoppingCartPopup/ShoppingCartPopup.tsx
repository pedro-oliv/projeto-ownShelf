'use client';

import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
    CartItem,
    getCart,
    removeFromCart,
    updateQuantity,
    getTotal
} from "@/app/utils/cart";

export default function ShoppingCartPopup() {
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState<CartItem[]>([]);

    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    function reloadCart() {
        setItems(getCart());
    }

    useEffect(() => {
        reloadCart();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const total = getTotal(items);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => {
                    reloadCart();
                    setOpen(!open);
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition cursor-pointer"
            >
                <ShoppingCart size={22} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-[420px] rounded-2xl bg-[#131416] shadow-xl border border-[#28292c] z-50 overflow-hidden">

                    <div className="p-4 border-b border-[#28292c]">
                        <h2 className="font-semibold text-lg">
                            Carrinho
                        </h2>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">

                        {items.length === 0 && (
                            <div className="p-6 text-center text-zinc-400">
                                Seu carrinho está vazio
                            </div>
                        )}

                        {items.map(item => (
                            <div
                                key={item.id}
                                className="p-4 border-b border-[#28292c]"
                            >
                                <div className="flex gap-3">

                                    <img
                                        src={item.capa}
                                        alt={item.titulo}
                                        className="w-16 h-24 object-cover rounded"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-medium line-clamp-2">
                                            {item.titulo}
                                        </h3>

                                        <p className="text-sm text-zinc-400">
                                            {item.autor}
                                        </p>

                                        <p className="mt-2 font-semibold text-[#f58142]">
                                            R$ {item.preco.toFixed(2)}
                                        </p>

                                        {item.tipo === "fisico" && (
                                            <div className="flex items-center gap-2 mt-2">

                                                <button
                                                    className="p-1 rounded bg-zinc-800"
                                                    onClick={() => {
                                                        updateQuantity(
                                                            item.id,
                                                            Math.max(
                                                                1,
                                                                item.quantidade - 1
                                                            )
                                                        );

                                                        reloadCart();
                                                    }}
                                                >
                                                    <Minus size={14} />
                                                </button>

                                                <span>
                                                    {item.quantidade}
                                                </span>

                                                <button
                                                    className="p-1 rounded bg-zinc-800"
                                                    onClick={() => {
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantidade + 1
                                                        );

                                                        reloadCart();
                                                    }}
                                                >
                                                    <Plus size={14} />
                                                </button>

                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            removeFromCart(item.id);

                                            reloadCart();
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-[#28292c] p-4 bg-[#131416]">

                        <div className="flex justify-between mb-4">
                            <span>Total</span>

                            <span className="font-semibold">
                                R$ {total.toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                setOpen(false);
                                router.push("/cart");
                            }}
                            className="
                                w-full
                                bg-[#f58142]
                                hover:bg-[#e76f2d]
                                text-white
                                py-2
                                rounded-md
                                transition
                                cursor-pointer
                            "
                        >
                            Ir para o carrinho
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}