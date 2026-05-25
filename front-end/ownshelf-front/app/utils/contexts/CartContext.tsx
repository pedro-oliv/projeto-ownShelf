"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>(
    []
  );

  function addItem(item: CartItem) {
    setCart((prev) => [...prev, item]);
  }

  function removeItem(id: number) {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart precisa estar dentro do CartProvider"
    );
  }

  return context;
}