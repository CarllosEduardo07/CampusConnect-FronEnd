import logo from '@/assets/logo.png';
import animacaoManutenção from '@/pages/erro404/animacao-manutencao.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

export function NotAuth() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <img src={logo} alt='' />
      <p className='text-2xl'>
        O Usuário não está <strong>Autenticado</strong> ou as credenciais fornecidas são inválidas.
      </p>
      <Link to='/' className='underline'>
        Faça o login novamente clicando aqui
      </Link>
      <Lottie animationData={animacaoManutenção} loop={true} className='h-[30rem]' />
    </div>
  );
}
