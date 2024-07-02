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
import { useFormCadastrarCliente } from "./useForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import estados_brasil from "@/assets/estados_brasil.json";
import { Loader2 } from "lucide-react";

export const CadastrarCliente = () => {
  const { form, submit, isPending } = useFormCadastrarCliente();

  return (
    <section className="flex justify-center pt-10">
      <Card className="w-10/12 dark:bg-bg bg-background">
        <CardHeader>
          <CardTitle>Cadastrar Cliente</CardTitle>
          <CardDescription>Preencha os dados do cliente</CardDescription>
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
                        <Input placeholder="Email do cliente" {...field} />
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                "pl-3 text-left font-normal dark:bg-foreground bg-background",
                                !field.value && "text-muted-foreground"
                              )}
                              variant="noShadow"
                            >
                              {field.value ? (
                                format(`${field.value}`, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(`${field.value}`)}
                            onSelect={field.onChange}
                            disabled={(date) => date < subDays(new Date(), 1)}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>

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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                "pl-3 text-left font-normal dark:bg-foreground bg-background",
                                !field.value && "text-muted-foreground"
                              )}
                              variant="noShadow"
                            >
                              {field.value ? (
                                format(`${field.value}`, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(`${field.value}`)}
                            onSelect={field.onChange}
                            disabled={(date) => date < subDays(new Date(), 1)}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>

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
                        <Input placeholder="Telefone 1" {...field} />
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
                        <Input placeholder="Telefone 2" {...field} />
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
                        <Input placeholder="Telefone 3" {...field} />
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
                        <Input placeholder="Documento" {...field} />
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
                        <Input placeholder="Origem" {...field} />
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
                        <Input placeholder="Contato" {...field} />
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
                          <Input
                            type="time"
                            className="dark:bg-foreground "
                            placeholder="Observações"
                            {...field}
                          />
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
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                className={cn(
                                  "pl-3 text-left font-normal dark:bg-foreground bg-background",
                                  !field.value && "text-muted-foreground"
                                )}
                                variant="noShadow"
                              >
                                {field.value ? (
                                  format(`${field.value}`, "PPP", {
                                    locale: ptBR,
                                  })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(`${field.value}`)}
                              onSelect={field.onChange}
                              disabled={(date) => date < subDays(new Date(), 1)}
                              initialFocus
                              locale={ptBR}
                            />
                          </PopoverContent>
                        </Popover>

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
                        <Input placeholder="Competitor" {...field} />
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
                        <Textarea placeholder="Observações" {...field} />
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
                        <Input placeholder="00000-000" {...field} />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background dark:bg-foreground dark:text-text">
                            <SelectValue placeholder="Selecione um Estado">
                              {estados_brasil?.find(
                                (estado) => estado.sigla === field.value
                              )?.nome ?? "Selecione um Estado"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background dark:bg-foreground">
                          {estados_brasil?.map((estado) => (
                            <SelectItem
                              key={estado.nome}
                              value={`${estado.nome}`}
                            >
                              {estado.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

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
                        <Input placeholder="Localidade" {...field} />
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
                        <Input placeholder="Logradouro" {...field} />
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
                        <Input placeholder="Número" {...field} />
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
                        <Textarea placeholder="Complemento" {...field} />
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
                onClick={() => form.reset()}
                variant="neutral"
              >
                Limpar
              </Button>
              <Button disabled={isPending} type="submit" className="w-[96px]">
                {isPending ? <Loader2 className="animate-spin" /> : "Cadastrar"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
};
