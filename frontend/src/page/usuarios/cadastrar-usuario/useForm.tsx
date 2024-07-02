import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

const schema = z
  .object({
    companyId: z.coerce.number().int().positive(),
    name: z
      .string({ message: "Nome é obrigatório" })
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z
      .string({ message: "Email é obrigatório" })
      .email({ message: "Formato de email inválido" }),
    password: z
      .string({ message: "Senha é obrigatório" })
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres"),
    confirmPassword: z
      .string({ message: "Confirmação de senha é obrigatório" })
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Senhas não conferem",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const useCriarUsuario = () => {
  const { api } = useApi();

  const criarUsuario = useMutation({
    mutationKey: ["criar-usuario"],
    mutationFn: async (form: FormData) => {
      const { data } = await api.post("/user", form);
      return data;
    },
  });

  return { ...criarUsuario, criarUsuario };
};

export const useCadastrarUsuario = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const user = useAuthStore((store) => store.user);
  const { mutate, isPending } = useCriarUsuario();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      form.setValue("companyId", user.companyId);
    }
  }, [user, form]);

  const submit = async (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast({ title: "Usuário cadastrado com sucesso" });
      },
      onError: (error) => {
        toast({
          title: "Erro ao cadastrar usuário",
          description: `${errorHandler(error).message}`,
        });
      },
    });
  };

  return {
    form,
    submit,
    isPending,
  };
};
