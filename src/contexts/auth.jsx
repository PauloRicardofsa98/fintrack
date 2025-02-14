import { useMutation } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/lib/axios";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!accessToken && !refreshToken) return;

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log(error);
      }
    };
    init();
  }, []);

  const login = async ({ email, password }) => {
    loginMutate(
      { email, password },
      {
        onSuccess: (loginUser) => {
          const accessToken = loginUser.tokens.accessToken;
          const refreshToken = loginUser.tokens.refreshToken;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setUser(loginUser);

          toast.success("Login realizado com sucesso");
        },
        onError: (error) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          toast.error(error.message);
        },
      },
    );
  };
  const signup = async () => {};

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
