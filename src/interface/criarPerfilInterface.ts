import { z } from 'zod';

//validação do forrmulario e interface
export const perfilSchema = z.object({
  name: z.string().min(4, 'Nome completo é obrigatório'),
  bio: z.string(),
  pic: z.string(),
  userrId: z.string(),
});
