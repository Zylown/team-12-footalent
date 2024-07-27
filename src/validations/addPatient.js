import { z } from "zod";

const addPatientSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  birthdate: z.string().min(10, {
    message: "La fecha de nacimiento debe tener el formato dd/mm/yyyy",
  }),
  dni: z
    .string()
    .min(8, { message: "El DNI debe tener al menos 8 caracteres" }),
  email: z
    .string()
    .email({ message: "El correo electrónico debe tener un formato válido" }),
  phone1: z
    .string()
    .min(9, { message: "El teléfono debe tener al menos 9 caracteres" }),
  phone2: z.string().optional(),
});

export default addPatientSchema;
