"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext =
  createContext<LoadingContextType | null>(null);

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] =
    useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(
    LoadingContext
  );

  if (!context) {
    throw new Error(
      "useLoading precisa estar dentro do LoadingProvider"
    );
  }

  return context;
}