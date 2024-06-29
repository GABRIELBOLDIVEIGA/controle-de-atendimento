import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFormCriarConta } from "./useForm";

export const CriarConta = () => {
  const { form, onSubmit, isPending } = useFormCriarConta();

  return (
    <section className="w-full h-screen grid place-content-center bg-bg dark:bg-darkBg ">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Criar conta</CardTitle>

              <ThemeToggle />
            </div>
            <CardDescription>
              Insira suas informações abaixo para criar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Nome</Label>
                      <FormControl>
                        <Input placeholder="Meu nome" {...field} />
                      </FormControl>

                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email</Label>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>

                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Senha</Label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Confirmar Senha</Label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isPending}
                  className="w-full"
                  variant="neutral"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="link">
              <Link to="/esqueci-minha-senha">Esqueci minha senha</Link>
            </Button>
            <Button variant="link">
              <Link to="/login">Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
