import { z } from "zod";

const validTlds = ["com", "org", "net", "edu", "gov", "mil", "co", "us", "biz", "info", "mobi", "name", "aero", "jobs", "museum", "io", "dev", "xyz", "es"]; 

const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(${validTlds.join("|")})$`);

const soporteSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  last_name: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
    email: z.string().min(1 ,{ message: 'El correo electrónico es requerido' }).regex(emailRegex, { message: 'Debe ser un correo electrónico válido' }),
  
  issue_detail: z
    .string()
    .min(1, { message: "Debe ingresar los detalles de su problema" }),
 
});

export default soporteSchema;
