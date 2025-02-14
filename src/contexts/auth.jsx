import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/lib/axios";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  isInitializing: true,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = "refreshToken";

const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
};
const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const { mutate: loginMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      return response.data;
    },
  });
  const { mutate: signupMutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({ firstName, lastName, email, password }) => {
      const response = await api.post("/users", {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        );
        if (!accessToken && !refreshToken) return;

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        removeTokens();
        setUser(null);
        console.log(error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const login = async ({ email, password }) => {
    loginMutate(
      { email, password },
      {
        onSuccess: (loginUser) => {
          setTokens(loginUser.tokens);
          setUser(loginUser);

          toast.success("Login realizado com sucesso");
        },
        onError: (error) => {
          removeTokens();
          toast.error(error.message);
        },
      },
    );
  };
  const signup = async (data) => {
    signupMutate(data, {
      onSuccess: (createdUser) => {
        setTokens(createdUser.tokens);
        setUser(createdUser);
        toast.success("Conta criada com sucesso!");
      },
      onError: () => {
        removeTokens();
        toast.error("Erro ao criar conta");
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
};
