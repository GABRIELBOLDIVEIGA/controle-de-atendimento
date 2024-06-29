import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";

export enum Role {
  DEV = "DEV",
  ADMIN = "ADMIN",
  USER = "USER",
}

export const jwtDecodeSchema = z
  .object({
    userId: z.coerce.number().positive().int(),
    companyId: z.coerce.number().positive().int(),
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(Role),
  })
  .or(z.null());

export type JwtDecode = z.infer<typeof jwtDecodeSchema>;

export type AuthStore = {
  user: JwtDecode;
  accessToken: string | null;
  setToken: (accessToken: string) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setToken: (token: string) => {
        const decoded = jwtDecode<JwtDecode>(token);

        if (jwtDecodeSchema.safeParse(decoded).success) {
          set(() => ({ accessToken: token, user: decoded }));
        } else {
          console.warn("[Data] => ", decoded);
          console.warn("[Error] => ", jwtDecodeSchema.safeParse(decoded));
          set(() => ({ user: null, accessToken: null }));
        }
      },

      reset: () => {
        set(() => ({ user: null, accessToken: null }));
      },
    }),
    {
      name: "auth-atendimento",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
