"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function login(
    email: string,
    password: string
  ) {
    setLoading(true);

    // simulando delay backend
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    // usuário fake
    const fakeUser = {
      id: 1,
      name: "Pedro",
      email: "teste@email.com",
      password: "123456",
    };

    // validação fake
    if (
      email === fakeUser.email &&
      password === fakeUser.password
    ) {
      setUser(fakeUser);

      localStorage.setItem(
        "user",
        JSON.stringify(fakeUser)
      );

      setLoading(false);

      return true;
    }

    setLoading(false);

    return false;
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("user");
  }

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth precisa estar dentro do AuthProvider"
    );
  }

  return context;
}