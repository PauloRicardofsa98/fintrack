import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/local-storage";
import { protectedApi, publicApi } from "@/lib/axios";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signout: () => {},
  isInitializing: true,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

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
      const response = await publicApi.post("/users/login", {
        email,
        password,
      });
      return response.data;
    },
  });
  const { mutate: signupMutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({ firstName, lastName, email, password }) => {
      const response = await protectedApi.post("/users", {
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
        const response = await protectedApi.get("/users/me");
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

  const signout = () => {
    removeTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, signout, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
};
