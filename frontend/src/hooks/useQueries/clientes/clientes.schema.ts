import { z } from "zod";

export const customerSchema = z.object({
  customer: z.object({
    id: z.coerce.number().int().positive(),
    name: z.string(),
    email: z.string().email().nullable(),
    phone1: z.string().nullable(),
    phone2: z.string().nullable(),
    phone3: z.string().nullable(),
    origin: z.string().nullable(),
    person: z.string().nullable(),
    competitor: z.string().nullable(),
    comments: z.string().nullable(),
    document: z.string().nullable(),
    first_contact: z.string().datetime().nullable(),
    last_contact: z.string().datetime().nullable(),
    createdAt: z.string().datetime().nullable(),
    updatedAt: z.string().datetime().nullable(),
    deletedAt: z.string().datetime().nullable(),

    customerAddress: z.array(
      z.object({
        address: z.object({
          id: z.coerce.number().int().positive(),
          cep: z.string().nullable(),
          logradouro: z.string().nullable(),
          complemento: z.string().nullable(),
          bairro: z.string().nullable(),
          localidade: z.string().nullable(),
          uf: z.string().nullable(),
          numero: z.string().nullable(),
          createdAt: z.string().datetime().nullable(),
          updatedAt: z.string().datetime().nullable(),
        }),
      })
    ),
  }),
});

export type Customer = z.infer<typeof customerSchema>;
