import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/apiClient";

interface AuthState {
  token: string;
  user: object;
}

interface SigInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SigInCredentials): Promise<void>;
  singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, SetData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@GoBaber:Token");
    const user = localStorage.getItem("@GoBaber:User");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@GoBarber:Token", token);
    localStorage.setItem("@Gobarber:user", JSON.stringify(user));

    SetData({ token, user });
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem("@GoBaber:Token");
    localStorage.removeItem("@GoBaber:User");

    SetData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context not created");
  }
  return context;
}

export { useAuth, AuthProvider };
