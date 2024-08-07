import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  lastName: z
    .string()
    .min(1, "El apellido es obligatorio")
    .max(100, "El apellido no puede exceder los 100 caracteres"),
  email: z
    .string()
    .email("Debe ser un correo electrónico válido")
    .min(1, "El correo electrónico es obligatorio"),
  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(10, "El DNI no puede exceder los 10 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder los 100 caracteres"),
  phone1: z
    .string()
    .regex(/^[0-9]/, "Debe ingresar un numero válido")
    .min(10, "el numero tiene que tener mas de 10 dígitos"),
    role: z.enum(["odontologo", "secretario"], {
      message: "Debe seleccionar un rol válido",
    }),
});

export default registerSchema;
