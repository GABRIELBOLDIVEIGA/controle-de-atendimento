import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { useApi } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../login/useForm";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(3, "Min 3 caracteres").max(50, "Max 50 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "Min 6 caracteres")
      .max(50, "Max 50 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Min 6 caracteres")
      .max(50, "Max 50 caracteres"),
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

export const CRIAR_CONTA_MUTATION_KEY = "criar-conta";

export const useCriarConta = () => {
  const { api } = useApi();

  const loginMutation = useMutation({
    mutationKey: [CRIAR_CONTA_MUTATION_KEY],
    mutationFn: async (form: FormData) => {
      const { data } = await api.post("/user/adm", form);
      return data;
    },
  });

  return { loginMutation, ...loginMutation };
};

export const useFormCriarConta = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate, isPending } = useCriarConta();
  const { toast } = useToast();
  const { mutate: loginMutation } = useLogin();
  const setToken = useAuthStore((store) => store.setToken);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        loginMutation(
          { email: data.email, password: data.password },
          {
            onSuccess: (resp) => {
              navigate("/minha-agenda");
              setToken(resp.accessToken);
            },
          }
        );
      },
      onError: (error) => {
        toast({
          title: "Não foi possível criar sua conta.",
          description: `${errorHandler(error).message}`,
          duration: 10000,
        });
      },
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
