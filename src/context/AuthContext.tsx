import { createContext, ReactNode, useState } from "react";

interface ContextProps {
  auth: boolean;
}

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}
