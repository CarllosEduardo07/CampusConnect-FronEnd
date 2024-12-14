import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  user: { id: number; fullName: string; profileId: number; token: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ id: number; fullName: string; profileId: number; token: string } | null>>;
  logout: () => void; // Adicionar a função logout
}

// Criar o contexto com o tipo inicial como nulo
export const AuthContext = createContext<AuthContextType | null>(null);

// Tipo para o provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ id: number; fullName: string; profileId: number; token: string } | null>(null);

  useEffect(() => {
    // Restaurar o estado do usuário a partir do token armazenado
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decodificar payload JWT
        setUser({ id: userData.userId, fullName: userData.fullName, profileId: userData.profileId, token });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        localStorage.removeItem('token'); // Remove token inválido
      }
    }
  }, []);

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token'); // Remover o token do localStorage
    setUser(null); // Resetar o estado do usuário
  };
  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}
