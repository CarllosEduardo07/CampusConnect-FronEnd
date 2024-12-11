import avatarGroup from '@/assets/avatar-group.png';
import campusconnectlogo from '@/assets/campusconnectlogo.svg';
import parttwocadastro from '@/assets/parttwocadastro.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userSchema } from '@/interface/usersInterface';
import { createUser } from '@/services/conexao';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

//integração com o typescript
export type UserSchema = z.infer<typeof userSchema>;

export default function Cadastrar() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  async function handleCreateUser(data: UserSchema) {
    // console.log(data);
    const validatedData = userSchema.parse(data);

    try {
      const response = await createUser(validatedData);

      if (response) {
        setSuccessMessage('Usuario Criado com Sucesso');
        reset();

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setErrorMessage('Erro ao criar o usuário. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com o servidor. Tente novamente.');
    }
    console.log(validatedData);
  }

  return (
    <section className='w-full h-screen bg-bannerImg bg-no-repeat bg-cover bg-bottom flex justify-center items-center'>
      <section className='w-full h-full flex justify-center items-center'>
        <article className='bg-white p-8 rounded-3xl w-auto md:w-[50%] lg:w-1/3 xl:w-[500px] '>
          <img src={campusconnectlogo} alt='logocampusconnect' className='w-40 mx-auto' />

          <form onSubmit={handleSubmit(handleCreateUser)} className=' mt-5 space-y-5 flex flex-col'>
            <Input type='text' placeholder='Nome Completo' {...register('fullName')} />
            {errors.fullName && <p className='text-red-500'>{errors.fullName.message}</p>}
            <Input type='email' placeholder='Email' {...register('email')} />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            <Input type='text' placeholder='Cpf' {...register('cpf')} />
            {errors.cpf && <p className='text-red-500'>{errors.cpf.message}</p>}
            <Input type='text' placeholder='Matricula da instituição' {...register('registration')} />
            {errors.registration && <p className='text-red-500'>{errors.registration.message}</p>}
            <Input type='password' placeholder='Criar Senha' {...register('password')} />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            <Button type='submit' className='bg-purple-600 hover:bg-purple-700'>
              Criar Conta
            </Button>
            {successMessage && <p className='text-green-500'>{successMessage}</p>} {/* Exibe a mensagem de sucesso */}
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <span className='mx-auto text-purple-700'>
              <Link to='/' className='hover:underline'>
                Já tem uma conta? <strong>Login</strong>
              </Link>
            </span>
            <span className='mx-auto text-purple-700 text-center'>
              <strong>Junte-se</strong> a mais de <strong>2M</strong> de usuários <br />
              campus connect!
              <span className='flex justify-center pt-3 h-10'>
                <img src={avatarGroup} alt='groupavatar' />
              </span>
            </span>
          </form>
        </article>

        <img src={parttwocadastro} alt='cadastroimg' className=' hidden lg:block ml-5 w-[650px] h-[600px]' />
      </section>
    </section>
  );
}
