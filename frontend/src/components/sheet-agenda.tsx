import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import {
  AGENDA_BY_CLIENTE_ID_QUERY_KEY,
  useAgendaByClienteId,
} from "@/hooks/useQueries/agenda/useAgendaByClienteId";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addHours, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";
import { useUpdateAgenda } from "@/hooks/useMutations/agenda/useUpdateAgenda";
import { formatMilitaryTime } from "@/helpers/format-military-time";
import { TODOS_AGENDAS_QUERY } from "@/hooks/useQueries/agenda/useTodasAgendas";
import { queryClient } from "@/lib/tanstack-react-query";
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";

const formSchema = z.object({
  customerId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),

  cliente_nome: z.string().optional().default(""),
  usuario_nome: z.string().optional().default(""),
  first_contact: z.string().optional().default(""),
  last_contact: z.string().optional().default(""),

  time_preference: z.string().optional().default("00:00"),
  next_return: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

const useFormAgenda = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { data, setCustomerId, isLoading } = useAgendaByClienteId();
  const { mutate, isPending } = useUpdateAgenda();
  const { toast } = useToast();

  useEffect(() => {
    setformValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const setformValues = () => {
    if (data) {
      form.setValue("companyId", data.companyId);
      form.setValue("customerId", data.customerId);

      form.setValue("cliente_nome", data.customer.name);
      form.setValue("usuario_nome", data.user.name);
      form.setValue(
        "first_contact",
        data.customer.first_contact
          ? `${new Date(data.customer.first_contact).toLocaleDateString()}`
          : ""
      );
      form.setValue(
        "last_contact",
        data.customer.last_contact
          ? `${new Date(data.customer.last_contact).toLocaleDateString()}`
          : ""
      );

      form.setValue(
        "time_preference",
        data.time_preference
          ? addHours(new Date(data.time_preference), 3).toLocaleTimeString()
          : "00:00"
      );
      form.setValue("next_return", new Date(data.next_return ?? new Date()));
    }
  };

  const submit = (data: FormSchema) => {
    mutate(
      {
        companyId: data.companyId,
        customerId: data.customerId,
        time_preference: formatMilitaryTime(data.time_preference),
        next_return: data.next_return.toISOString(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              queryKey[0] === AGENDA_BY_CLIENTE_ID_QUERY_KEY ||
              queryKey[0] === TODOS_AGENDAS_QUERY,
          });
          toast({ title: "Agenda atualizada com sucesso!" });
        },
        onError: (error) => {
          toast({
            title: "Erro ao atualizar agenda!",
            description: `${errorHandler(error).message}`,
          });
        },
      }
    );
  };

  return { form, setCustomerId, isLoading, isPending, submit, setformValues };
};

interface SheetScheduleProps {
  children?: React.ReactNode;
  customerId: number;
}

export function SheetSchedule({ children, customerId }: SheetScheduleProps) {
  const { form, setCustomerId, isLoading, submit, setformValues } =
    useFormAgenda();

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) setCustomerId(customerId);

        if (!open) setformValues();
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes da Agenda</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-[95%] grid gap-4 py-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
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
                    name="first_contact"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primeiro contato</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Primeiro contato"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="last_contact"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ultimo contato</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Ultimo contato"
                            {...field}
                          />
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
                </div>
                <SheetFooter>
                  <div className="w-full flex justify-between">
                    <Button type="submit">Salvar Alterações</Button>
                  </div>
                </SheetFooter>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
