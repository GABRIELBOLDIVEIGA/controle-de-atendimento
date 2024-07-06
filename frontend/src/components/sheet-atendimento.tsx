import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOcorrencias } from "@/hooks/useQueries/ocorrencias/useOcorrencias";
import { useEffect } from "react";
import { useCliente } from "@/hooks/useQueries/clientes/useCliente";
import { useAuthStore } from "@/store/auth.store";
import { useDemaisOcorrencias } from "@/hooks/useQueries/demais-ocorrencias/useDemaisOcorrencias";
import { useCriarAtendimento } from "@/hooks/useMutations/atendimento/useCriarAtendimento";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import { queryClient } from "@/lib/tanstack-react-query";
import { AGENDA_BY_CLIENTE_ID_QUERY_KEY } from "@/hooks/useQueries/agenda/useAgendaByClienteId";
import { TODOS_AGENDAS_QUERY } from "@/hooks/useQueries/agenda/useTodasAgendas";

const formSchema = z.object({
  cliente_nome: z.string().optional().default(""),
  usuario_nome: z.string().optional().default(""),

  companyId: z.coerce.number().int().positive(),
  customerId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),

  time_preference: z.string().optional(),
  next_return: z.date(),

  comments: z.string().default(""),
  occurenceId: z.coerce.number().int().positive(),
  otherOccurenceId: z.coerce.number().int().positive().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const useFormAtendimento = (customerId: number) => {
  const { user } = useAuthStore();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId,
      usuario_nome: user?.name,
      userId: user?.userId,
      companyId: user?.companyId,
      time_preference: "00:00",
      next_return: addDays(new Date(), 7),
    },
  });
  const { data: cliente } = useCliente(customerId);
  const { mutate, isPending } = useCriarAtendimento();
  const { toast } = useToast();

  useEffect(() => {
    if (!cliente) return;
    form.setValue("cliente_nome", cliente?.customer.name);
  }, [cliente, form]);

  const submit = (data: FormSchema) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast({ title: "Atendimento salvo com sucesso!" });
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              queryKey[0] === AGENDA_BY_CLIENTE_ID_QUERY_KEY ||
              queryKey[0] === TODOS_AGENDAS_QUERY,
          });
        },
        onError: (error) => {
          toast({
            title: "Erro ao salvar o atendimento!",
            description: `${errorHandler(error).message}`,
          });
        },
      }
    );
  };

  return { form, submit, isPending };
};

interface SheetAtendimentoProps {
  children?: React.ReactNode;
  customerId: number;
}

export const SheetAtendimento = ({
  children,
  customerId,
}: SheetAtendimentoProps) => {
  const { form, submit, isPending } = useFormAtendimento(customerId);
  const { data: ocorrencias } = useOcorrencias();
  const { data: demaisOcorrencias } = useDemaisOcorrencias();

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) form.reset();
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Atendimento Iniciado</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-[95%] grid gap-4 py-4">
          <Form {...form}>
            <form
              className="flex flex-col justify-between"
              onSubmit={form.handleSubmit(submit)}
            >
              <div className="space-y-3">
                <FormField
                  name="cliente_nome"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Cliente" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="usuario_nome"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Usuário" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="time_preference"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-fit">
                      <FormLabel className="text-nowrap">
                        Preferência de horário
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          className="dark:bg-foreground "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="next_return"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3 pt-[6px] w-[60%]">
                      <FormLabel>Próximo retorno</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                "pl-3 text-left font-normal dark:bg-foreground bg-background"
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
                  name="occurenceId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocorrência *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma ocorrência" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ocorrencias?.map((ocorrencia) => (
                            <SelectItem
                              key={ocorrencia.id}
                              value={ocorrencia.id.toString()}
                            >
                              {ocorrencia.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="otherOccurenceId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocorrência secundária</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma ocorrência" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {demaisOcorrencias?.map((ocorrencia) => (
                            <SelectItem
                              key={ocorrencia.id}
                              value={ocorrencia.id.toString()}
                            >
                              {ocorrencia.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="comments"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Observações..."
                          className="dark:bg-foreground "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter>
                <div className="w-full flex justify-between">
                  <Button type="submit">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
