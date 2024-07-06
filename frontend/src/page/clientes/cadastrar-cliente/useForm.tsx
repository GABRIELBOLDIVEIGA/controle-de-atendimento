import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { useApi } from "@/hooks/useApi";
import { AGENDA_BY_CLIENTE_ID_QUERY_KEY } from "@/hooks/useQueries/agenda/useAgendaByClienteId";
import { TODOS_AGENDAS_QUERY } from "@/hooks/useQueries/agenda/useTodasAgendas";
import { MEUS_CLIENTE_QUERY_KEY } from "@/hooks/useQueries/clientes/useMeusCliente";
import { TODOS_CLIENTES_QUERY_KEY } from "@/hooks/useQueries/clientes/useTodosClientes";
import { queryClient } from "@/lib/tanstack-react-query";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  userId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),

  name: z.string({ message: "Nome do cliente é obrigatório" }),
  email: z.string().email().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  origin: z.string().optional(),
  person: z.string().optional(),
  competitor: z.string().optional(),
  comments: z.string().optional(),
  document: z.string().optional(),

  first_contact: z.date().optional(),
  last_contact: z.date().optional(),

  schedule: z.object({
    time_preference: z.string().optional(),
    next_return: z.date().optional(),
  }),

  address: z.object({
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    localidade: z.string().optional(),
    uf: z.string().optional(),
    numero: z.string().optional(),
  }),
});
type CadastrarClienteForm = z.infer<typeof schema>;

const useCriarCliente = () => {
  const { api } = useApi();

  const criarCliente = useMutation({
    mutationKey: ["criarCliente"],
    mutationFn: async (form: CadastrarClienteForm) => {
      const { data } = await api.post("/customer", form);
      return data;
    },
  });

  return { ...criarCliente, criarCliente };
};

export const useFormCadastrarCliente = () => {
  const user = useAuthStore((store) => store.user);
  const form = useForm<CadastrarClienteForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.userId);
      form.setValue("companyId", user.companyId);
    }
  }, [user, form]);

  const { mutate, isPending } = useCriarCliente();
  const { toast } = useToast();

  const submit = (data: CadastrarClienteForm) => {
    mutate(data, {
      onSuccess: () => {
        toast({ title: "Cliente cadastrado com sucesso!" });
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey[0] === TODOS_CLIENTES_QUERY_KEY ||
            queryKey[0] === MEUS_CLIENTE_QUERY_KEY ||
            queryKey[0] === AGENDA_BY_CLIENTE_ID_QUERY_KEY ||
            queryKey[0] === TODOS_AGENDAS_QUERY,
        });
      },
      onError: (error) => {
        toast({
          title: "Erro ao cadastrar cliente!",
          description: `${errorHandler(error).message}`,
        });
      },
    });
  };

  return {
    form,
    isPending,
    submit,
  };
};
