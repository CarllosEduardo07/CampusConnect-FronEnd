import logo from '@/assets/logo.png';
import { AuthContext } from '@/components/authProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postLogin } from '@/services/conexao';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext); // Acessar o AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoLogin: any = {
      email,
      password,
    };

    try {
      const response = await postLogin(novoLogin); // Certifique-se de que a função `postLogin` retorna o token
      if (response.token) {
        localStorage.setItem('token', response.token); // Salve o token no localStorage

        //atualizando o estado do navbar, apos o login, para mostra o nome do usuario
        const userData = JSON.parse(atob(response.token.split('.')[1])); // Decodificar payload JWT

        auth?.setUser({ id: userData.userId, fullName: userData.fullName, profileId: response.profileId, token: response.token }); // Atualizar contexto

        navigate('/forum');
      }
    } catch (error: any) {
      setError(error.message || 'Ocorreu um erro ao tentar fazer login');
    }
  };

  return (
    <section className='w-full h-full flex justify-center items-center relative bg-purple-200'>
      <article className='h-[55%] md:h-[40%] w-[400px] rounded-3xl bg-white flex items-center justify-center flex-col'>
        <img src={logo} alt='campus connect' className='w-40 mx-auto' />

        <form onSubmit={handleSubmit} className='w-4/5 space-y-5 flex flex-col'>
          <Input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
          <Input type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className='text-red-600 text-sm'>{error}</p>}

          <Button type='submit' className='bg-purple-600 hover:bg-purple-700'>
            Entrar
          </Button>
          <p className='mx-auto text-sm'>
            Novo no Campus Connect?
            <Link to='/cadastrar' className='ml-1 text-purple-700 hover:underline'>
              Crie uma conta
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
}
