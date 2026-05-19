"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { LoadingProvider } from "../contexts/LoadingContext";


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </CartProvider>
    </AuthProvider>
  );
}