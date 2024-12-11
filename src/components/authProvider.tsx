import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  user: { id: number; fullName: string; token: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ id: number; fullName: string; token: string } | null>>;
}

// Criar o contexto com o tipo inicial como nulo
export const AuthContext = createContext<AuthContextType | null>(null);

// Tipo para o provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ id: number; fullName: string; token: string } | null>(null);

  useEffect(() => {
    // Restaurar o estado do usuário a partir do token armazenado
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decodificar payload JWT
        setUser({ id: userData.userId, fullName: userData.fullName, token });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        localStorage.removeItem('token'); // Remove token inválido
      }
    }
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
