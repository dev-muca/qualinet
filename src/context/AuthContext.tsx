import API_URL from "@/constants/API";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface SessionProps extends User {
  token: string;
}

interface ContextProps {
  auth: any;
  session: SessionProps;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();

  const [modal, setModal] = useState<boolean>(false);
  const [session, setSession] = useState<SessionProps>(null!);

  useEffect(() => {
    const getSession = async () => {
      const storage = sessionStorage.getItem("session");
      if (!storage) return push("/");
      const data = JSON.parse(storage as string);
      setSession(data);
      return push("/home");
    };

    getSession();
  }, []);

  const auth = async ({ email, password }: User) => {
    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        const { userInformation, token } = data;
        sessionStorage.setItem("session", JSON.stringify({ userInformation, token }));
        setSession({
          userid: userInformation.userid,
          email: userInformation.email,
          name: userInformation.name,
          type: userInformation.type,
          token,
        });
        return push("/home");
      }

      return data;
    } catch (err: any) {
      console.warn(">> CONTEXT ERROR <<\nmore:", err.message);
      throw new Error("Error found in Context API, more:", err.message);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    push("/");
  };

  return <AuthContext.Provider value={{ session, auth, logout }}>{children}</AuthContext.Provider>;
}
