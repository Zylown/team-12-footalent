import { z } from 'zod';

const validTlds = ["com", "org", "net", "edu", "gov", "mil", "co", "us", "biz", "info", "mobi", "name", "aero", "jobs", "museum", "io", "dev", "xyz", "es"]; 

const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(${validTlds.join("|")})$`);

const loginSchema = z.object({
  email: z.string().min(1 ,{ message: 'El correo electrónico es requerido' }).regex(emailRegex, { message: 'Debe ser un correo electrónico válido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export default loginSchema;
