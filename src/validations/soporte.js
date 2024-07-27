import { z } from "zod";

const soporteSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  
  details: z
    .string()
    .min(1, { message: "Debe ingresar los detalles de su problema" }),
 
});

export default soporteSchema;
