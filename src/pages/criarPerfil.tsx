import { AuthContext } from '@/components/authProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { perfilSchema } from '@/interface/criarPerfilInterface';
import { createPerfil } from '@/services/conexao';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

export type PerfilSchema = z.infer<typeof perfilSchema>;

export function CriarPerfil() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<PerfilSchema>({
    resolver: zodResolver(perfilSchema),
  });

  const auth = useContext(AuthContext);

  const handleCreatePerfil = async (data: PerfilSchema) => {
    console.log('teste');

    const updatedData = {
      ...data,
      pic: 'abc',
      userId: auth?.user?.id, // Substitua pelo ID do usuário correspondente
    };

    const validatedData = perfilSchema.parse(updatedData); // Valida o schema
    console.log(validatedData);

    try {
      if (!auth) {
        console.error('Usuário não autenticado:', auth);
        setErrorMessage('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const response = await createPerfil(validatedData);

      if (response) {
        setSuccessMessage('Perfil Criado com Sucesso!');
        navigate('/forum');
      } else {
        setErrorMessage('Erro ao Criar Perfil, tente Novamente!');
      }
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      setErrorMessage('Erro ao conectar com o servidor. Tente novamente.');
    }
    console.log('teste fim');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b p-4 flex items-center justify-center'>
      <Card className='w-full max-w-xl'>
        <CardHeader>
          <CardTitle>Crie Seu Perfil</CardTitle>
          <CardDescription>Essas Informações vão ser exibidas para as outras pessoas</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCreatePerfil)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='fullName'>Nome Completo</Label>
                <Input id='fullName' type='text' placeholder='Digite seu nome' {...register('name')} />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bio'>Biografia</Label>
              <Textarea id='bio' placeholder='Conte um pouco sobre você' className='min-h-[120px] max-h-[160px]' {...register('bio')} />
            </div>
            {successMessage && <p className='text-green-500'>{successMessage}</p>} {/* Exibe a mensagem de sucesso */}
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <Button type='submit' className='w-full bg-purple-600 hover:bg-purple-700'>
              Salvar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
