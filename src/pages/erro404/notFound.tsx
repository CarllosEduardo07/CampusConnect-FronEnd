import animacao404 from '@/pages/erro404/animacao-404.json';
import Lottie from 'lottie-react';

export const NotFound = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl'>
        <strong>404</strong> - Página não encontrada
      </h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Lottie animationData={animacao404} loop={true} className='h-[40rem]' />
    </div>
  );
};
