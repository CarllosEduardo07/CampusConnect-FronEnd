import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  return (
    <section className='w-full h-full flex justify-center items-center relative bg-purple-200'>
      <article className='h-[55%] md:h-[40%] w-[400px] rounded-3xl bg-white flex items-center justify-center flex-col'>
        <img src={logo} alt='campus connect' className='w-40 mx-auto' />

        <form className='w-4/5 space-y-5 flex flex-col'>
          <Input type='email' placeholder='Email' />
          <Input type='password' placeholder='Senha' />
          <Button type='submit' className='bg-purple-600 hover:bg-purple-700'>
            Entrar
          </Button>
          <p className='mx-auto text-sm'>
            Novo no Campus Connect?
            <a href={'/cadastrar'} className='ml-1 text-purple-700 hover:underline'>
              Crie uma conta
            </a>
          </p>
        </form>
      </article>
    </section>
  );
}
