import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { useApi } from "@/hooks/useApi";
import { useUpdateAgenda } from "@/hooks/useMutations/agenda/useUpdateAgenda";
import { useUpdateEndereco } from "@/hooks/useMutations/endereco/useUpdateEndereco";
import { useAgendaByClienteId } from "@/hooks/useQueries/agenda/useAgendaByClienteId";
import { useCliente } from "@/hooks/useQueries/clientes/useCliente";
import { useEnderecoByClienteId } from "@/hooks/useQueries/enderecos/useEnderecoByClienteId";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addHours } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  userId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),
  customerId: z.coerce.number().int().positive(),

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

  schedule: z
    .object({
      time_preference: z.string().optional(),
      next_return: z.date().optional(),
    })
    .optional(),

  address: z
    .object({
      id: z.coerce.number().int().positive(),
      cep: z.string().optional(),
      logradouro: z.string().optional(),
      complemento: z.string().optional(),
      bairro: z.string().optional(),
      localidade: z.string().optional(),
      uf: z.string().optional(),
      numero: z.string().optional(),
    })
    .optional(),
});

type EditarClienteForm = z.infer<typeof schema>;

const useEditarCliente = () => {
  const { api } = useApi();

  const editarCliente = useMutation({
    mutationKey: ["editarCliente"],
    mutationFn: async (form: EditarClienteForm) => {
      const { data } = await api.patch(`/customer/${form.customerId}`, form);
      return data;
    },
  });

  return { ...editarCliente, editarCliente };
};

export const useFormEditarCliente = () => {
  const form = useForm<EditarClienteForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone1: "",
      phone2: "",
      phone3: "",
      origin: "",
      person: "",
      competitor: "",
      comments: "",
      document: "",
      address: {},
    },
  });
  const params = useParams<{ id: string }>();
  const { data: cliente, setCustomerId } = useCliente();
  const { data: endereco, setCustomerId: setCustomerIdEndereco } =
    useEnderecoByClienteId();
  const { data: agenda, setCustomerId: setCustomerIdAgenda } =
    useAgendaByClienteId();
  const { mutate, isPending } = useEditarCliente();
  const { mutate: updateAgenda } = useUpdateAgenda();
  const { mutate: updateEndereco } = useUpdateEndereco();
  const { toast } = useToast();
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    if (params.id) {
      setCustomerId(Number(params.id));
      setCustomerIdEndereco(Number(params.id));
      setCustomerIdAgenda(Number(params.id));
    }
  }, [params, setCustomerId, setCustomerIdEndereco, setCustomerIdAgenda]);

  const setDataForm = () => {
    if (cliente && user) {
      form.setValue("customerId", cliente.customer.id);
      form.setValue("userId", user.userId);
      form.setValue("companyId", user.companyId);
      form.setValue("name", cliente.customer.name);
      form.setValue("email", cliente.customer.email ?? undefined);
      form.setValue("phone1", cliente.customer.phone1 ?? undefined);
      form.setValue("phone2", cliente.customer.phone2 ?? undefined);
      form.setValue("phone3", cliente.customer.phone3 ?? undefined);
      form.setValue("origin", cliente.customer.origin ?? undefined);
      form.setValue("person", cliente.customer.person ?? undefined);
      form.setValue("competitor", cliente.customer.competitor ?? undefined);
      form.setValue("comments", cliente.customer.comments ?? undefined);
      form.setValue("document", cliente.customer.document ?? undefined);
      form.setValue(
        "first_contact",
        cliente.customer.first_contact != null
          ? new Date(cliente.customer.first_contact)
          : undefined
      );
      form.setValue(
        "last_contact",
        cliente.customer.last_contact != null
          ? new Date(cliente.customer.last_contact)
          : undefined
      );
    }

    if (endereco) {
      form.setValue("address.id", endereco.address.id);
      form.setValue("address.cep", endereco.address.cep ?? "");
      form.setValue("address.logradouro", endereco.address.logradouro ?? "");

      form.setValue("address.complemento", endereco.address.complemento ?? "");

      form.setValue("address.bairro", endereco.address.bairro ?? "");
      form.setValue("address.localidade", endereco.address.localidade ?? "");

      form.setValue("address.uf", endereco.address.uf ?? "");
      form.setValue("address.numero", endereco.address.numero ?? "");
    }

    if (agenda) {
      form.setValue(
        "schedule.time_preference",
        addHours(new Date(agenda.time_preference), 3).toLocaleTimeString()
      );
      form.setValue("schedule.next_return", new Date(agenda.next_return));
    }
  };

  useEffect(() => {
    setDataForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliente, endereco, agenda]);

  const submit = (data: EditarClienteForm) => {
    mutate(data, {
      onSuccess: () => {
        toast({ title: "Cliente editado com sucesso!" });
      },
      onError: (error) => {
        toast({
          title: "Erro ao editar cliente!",
          description: `${errorHandler(error).message}`,
        });
      },
    });

    if (data.address)
      updateEndereco({ ...data.address, customerId: data.customerId });

    if (data.schedule?.time_preference && data.schedule.next_return)
      updateAgenda({
        companyId: data.companyId,
        customerId: data.customerId,
        time_preference:
          data.schedule.time_preference.split(":")[0] +
          ":" +
          data.schedule.time_preference.split(":")[1],
        next_return: `${addHours(
          new Date(data.schedule.next_return),
          6
        ).toISOString()}`,
      });
  };

  const reset = () => {
    setDataForm();
  };

  return {
    form,
    submit,
    isPending,
    reset,
  };
};
