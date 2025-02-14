import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";

const signupSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  lastName: z.string().trim().min(1, {
    message: "O sobrenome é obrigatório",
  }),
  email: z
    .string()
    .email({
      message: "O email é inválido",
    })
    .trim()
    .min(1, {
      message: "O email é obrigatório",
    }),
  password: z.string().trim().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
  confirmPassword: z.string().trim().min(6, {
    message: "A confirmação de senha deve ter no mínimo 6 caracteres",
  }),
  terms: z.boolean().refine((value) => value, {
    message: "Você deve aceitar os termos de uso e política de privacidade",
  }),
});

const SignupPage = () => {
  const [user, setUser] = useState({
    firstName: "Jhoe",
    lastName: "Doe",
    email: "test@gmail.com",
    password: "123456",
    tokens: {
      accessToken: "123456",
      refreshToken: "123456",
    },
  });

  const { mutate } = useMutation({
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

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser(createdUser);
        toast.success("Conta criada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao criar conta");
      },
    });
  };

  if (user) {
    return <h1>{user.firstName}</h1>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Ao clicar em Criar conta, você aceita os{" "}
                        <a
                          href="#"
                          className={`text-white underline ${form.formState.errors.terms ? "text-red-500" : "text-blue-500"}`}
                        >
                          nossos termos de uso e política de privacidade.
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Criar conta
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
