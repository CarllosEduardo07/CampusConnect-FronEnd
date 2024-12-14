import { z } from 'zod';

//validação do forrmulario e interface
export const userSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().min(1, 'Nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  registration: z.string(),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número')
    .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)'),
});
export interface UsersInterface {
  id: number;
  fullName: string;
  password: string;
  email: string;
  birthDate: string;
  phone: string;
  cpf: string;
  registration: string;
  avatar: string;
}
export interface PerfilInterface {
  id: number;
  name: string;
  bio: string;
  pic: string;
}
