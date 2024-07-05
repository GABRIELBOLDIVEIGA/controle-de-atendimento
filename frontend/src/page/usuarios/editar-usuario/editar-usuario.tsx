import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEditarUsuarioForm } from "./useForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const EditarUsuario = () => {
  const { form, submit, isPending, reset } = useEditarUsuarioForm();
  return (
    <section className="flex justify-center pt-10 ">
      <Card className="w-10/12 dark:bg-bg bg-background">
        <CardHeader>
          <CardTitle>Editar Usuário</CardTitle>
          <CardDescription>Preencha os dados do usuário</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-4 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="reset" onClick={() => reset()} variant="neutral">
                Limpar
              </Button>
              <Button disabled={isPending} type="submit" className="w-[96px]">
                {isPending ? <Loader2 className="animate-spin" /> : "Salvar"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
};
