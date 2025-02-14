import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth";

const loginSchema = z.object({
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
});

const LoginPage = () => {
  const { user, login, isInitializing } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => login(data);

  if (isInitializing) return null;

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Fazer login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
