"use client";

import { AlertProvider } from "../contexts/AlertContext";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { LoadingProvider } from "../contexts/LoadingContext";


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <AlertProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </AlertProvider>
    </LoadingProvider>
  );
}