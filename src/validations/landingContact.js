import { z } from "zod";

export const landingContactSchema = z.object({
  first_name: z.string().nonempty({ message: "El nombre es requerido" }),
  last_name: z.string().optional(),
  email: z.string().email({ message: "El correo electrónico es inválido" }),
  phone_number: z.string().nonempty({ message: "El teléfono es requerido" }),
  issue_detail: z.string().optional(),
});
