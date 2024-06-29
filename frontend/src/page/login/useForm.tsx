import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "@/helpers/error-handler";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});
type LoginForm = z.infer<typeof schema>;

export const LOGIN_MUTATION_KEY = "login";

export const useLogin = () => {
  const { api } = useApi();

  const loginMutation = useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: async (form: LoginForm) => {
      const { data } = await api.post<{ accessToken: string }>("/auth", form);
      return data;
    },
  });

  return { loginMutation, ...loginMutation };
};

export const useFormLogin = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useLogin();
  const setToken = useAuthStore((store) => store.setToken);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: (resp) => {
        navigate("/agenda");
        setToken(resp.accessToken);
      },
      onError: (error) => {
        toast({
          title: "Verifique os dados digitados.",
          description: `${errorHandler(error).message}`,
          duration: 10000,
        });
      },
    });
  };

  return { form, onSubmit, isPending };
};
