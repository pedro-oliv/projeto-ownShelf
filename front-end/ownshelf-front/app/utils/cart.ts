export type CartItem = {
  id: string;
  titulo: string;
  autor: string;
  preco: number;
  capa: string;
};

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function setCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const exists = cart.find((i) => i.id === item.id);

  if (exists) {
    return cart; // não duplica
  }

  const updated = [...cart, item];

  setCart(updated);
  return updated;
}

export function removeFromCart(id: string) {
  const cart = getCart();

  const updated = cart.filter((item) => item.id !== id);

  setCart(updated);
  return updated;
}

export function getTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.preco, 0);
}

