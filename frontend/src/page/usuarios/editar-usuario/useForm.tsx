import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useUsuario,
  USUARIO_QUERY_KEY,
} from "@/hooks/useQueries/usuarios/useUsuario";
import { queryClient } from "@/lib/tanstack-react-query";
import { TODOS_USUARIOS_QUERY_KEY } from "@/hooks/useQueries/usuarios/useUsuarios";

const schema = z.object({
  userId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
});

type FormData = z.infer<typeof schema>;

const useEditarUsuario = () => {
  const { api } = useApi();

  const editarUsuario = useMutation({
    mutationKey: ["editar-usuario"],
    mutationFn: async (form: FormData) => {
      const { data } = await api.patch(
        `/user/${form.userId}/${form.companyId}`,
        form
      );
      return data;
    },
  });

  return { ...editarUsuario, criarUsuario: editarUsuario };
};

export const useEditarUsuarioForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const user = useAuthStore((store) => store.user);
  const { mutate, isPending } = useEditarUsuario();
  const { toast } = useToast();
  const params = useParams<{ userId: string }>();
  const { data, isLoading, setUsuarioId } = useUsuario();

  useEffect(() => {
    if (params.userId) {
      setUsuarioId(Number(params.userId));
    }
  }, [params, setUsuarioId]);

  useEffect(() => {
    if (data && user) {
      form.setValue("userId", data.id);
      form.setValue("companyId", user.companyId);
      form.setValue("name", data.name);
    }
  }, [data, form, user]);

  const submit = async (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast({ title: "Dados do usuário editados com sucesso" });
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === USUARIO_QUERY_KEY ||
            query.queryKey[0] === TODOS_USUARIOS_QUERY_KEY,
        });
      },
      onError: (error) => {
        toast({
          title: "Erro ao editar usuário",
          description: `${errorHandler(error).message}`,
        });
      },
    });
  };

  const reset = () => {
    if (data && user) {
      form.setValue("userId", data.id);
      form.setValue("companyId", user.companyId);
      form.setValue("name", data.name);
    }
  };

  return {
    form,
    submit,
    isPending,
    isLoading,
    reset,
  };
};
