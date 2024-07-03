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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFormDetalhesCliente } from "./useForm";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const DetalhesCliente = () => {
  const { form, isLoadingCliente, isLoadingEndereco, isLoadingAgenda } =
    useFormDetalhesCliente();
  const navigate = useNavigate();

  return (
    <section className="flex justify-center pt-10">
      <Card className="w-10/12 dark:bg-bg bg-background">
        <CardHeader>
          <CardTitle>Detalhes do Cliente</CardTitle>
          <CardDescription>Dados do cliente</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-4 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input
                            readOnly
                            placeholder="Nome do cliente"
                            {...field}
                          />
                        )}
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input
                            readOnly
                            placeholder="Email do cliente"
                            {...field}
                          />
                        )}
                      </FormControl>

                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="first_contact"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3 pt-[6px] ">
                      <FormLabel>Primeiro contato</FormLabel>

                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input
                            readOnly
                            value={
                              field.value
                                ? format(`${field.value}`, "PPP", {
                                    locale: ptBR,
                                  })
                                : ""
                            }
                          />
                        )}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="last_contact"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3 pt-[6px] ">
                      <FormLabel>Ultimo contato</FormLabel>

                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input
                            readOnly
                            value={
                              field.value
                                ? format(`${field.value}`, "PPP", {
                                    locale: ptBR,
                                  })
                                : ""
                            }
                          />
                        )}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
                <FormField
                  name="phone1"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone 1</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Telefone 1" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone2"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone 2</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Telefone 2" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone3"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone 3</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Telefone 3" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
                <FormField
                  name="document"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Documento" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="origin"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origem</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Origem" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="person"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Contato" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
                <div className="flex justify-between">
                  <FormField
                    name="schedule.time_preference"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-nowrap">
                          Preferência de horário
                        </FormLabel>
                        <FormControl>
                          {isLoadingAgenda ? (
                            <Skeleton className="h-10 bg-slate-400" />
                          ) : (
                            <Input
                              readOnly
                              type="time"
                              className="dark:bg-foreground "
                              placeholder="Observações"
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormMessage className="text-red-900" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="schedule.next_return"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3 pt-[6px] w-[60%]">
                        <FormLabel>Próximo retorno</FormLabel>

                        <FormControl>
                          {isLoadingAgenda ? (
                            <Skeleton className="h-10 bg-slate-400" />
                          ) : (
                            <Input
                              readOnly
                              value={
                                field.value
                                  ? format(`${field.value}`, "PPP", {
                                      locale: ptBR,
                                    })
                                  : ""
                              }
                            />
                          )}
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="competitor"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competitor</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Competitor" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="comments"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        {isLoadingCliente ? (
                          <Skeleton className="h-20 bg-slate-400" />
                        ) : (
                          <Textarea
                            readOnly
                            placeholder="Observações"
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-4 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
                <FormField
                  name="address.cep"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cep</FormLabel>
                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="00000-000" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.uf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF</FormLabel>

                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="UF" {...field} />
                        )}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.localidade"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localidade</FormLabel>
                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Localidade" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.logradouro"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logradouro</FormLabel>
                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Logradouro" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
                <FormField
                  name="address.numero"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Número" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.bairro"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-10 bg-slate-400" />
                        ) : (
                          <Input readOnly placeholder="Bairro" {...field} />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.complemento"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-start-3 col-span-2">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        {isLoadingEndereco ? (
                          <Skeleton className="h-20 bg-slate-400" />
                        ) : (
                          <Textarea
                            readOnly
                            placeholder="Complemento"
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="reset"
                onClick={() => navigate(-1)}
                variant="neutral"
              >
                Voltar
              </Button>
              <Button
                type="button"
                className="w-[96px]"
                onClick={() =>
                  navigate(
                    `/clientes/historico-clientes/${form.getValues(
                      "customerId"
                    )}`
                  )
                }
              >
                Historico
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
};
