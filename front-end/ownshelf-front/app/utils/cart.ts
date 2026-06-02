export interface CartItem {
    id: string;
    titulo: string;
    autor: string;
    capa: string;
    tipo: "fisico" | "digital";
    preco: number;
    quantidade: number;
}

const STORAGE_KEY = "ownshelf-cart";

export function getCart(): CartItem[] {
    const cart = localStorage.getItem(STORAGE_KEY);

    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function removeFromCart(id: string) {
    const cart = getCart();

    saveCart(cart.filter(item => item.id !== id));
}

export function updateQuantity(
    id: string,
    quantity: number
) {
    const cart = getCart();

    const updated = cart.map(item =>
        item.id === id
            ? { ...item, quantidade: quantity }
            : item
    );

    saveCart(updated);
}

export function getTotal(cart: CartItem[]) {
    return cart.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
    );
}