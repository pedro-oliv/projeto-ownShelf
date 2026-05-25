"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/app/utils/Api";

import { useLoading } from "./LoadingContext";
import { useAlert } from "./AlertContext";
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  nome: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const { setLoading } = useLoading()
  const { showAlert } = useAlert()
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const me = await api.get("/auth/me", {
          withCredentials: true,
        });

        setUser(me.data.user);
      } catch {
        try {
          const refresh = await api.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );

          const token = refresh.data.token;

          const me = await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(me.data.user);
        } catch {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(email: string, senha: string) {
    setLoading(true);
    await api.post("/auth/login", { email: email, senha: senha })
      .then((response) => {
        setLoading(false)
        setUser(response.data.sucesso.dados.user)
        setToken(response.data.sucesso.token)
        showAlert(response.data.sucesso.dados.message)
        router.push('/home')
      })
      .catch((e) => {
        setLoading(false)
        showAlert(e.response.data.message)
      })

  }

  async function logout() {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
}