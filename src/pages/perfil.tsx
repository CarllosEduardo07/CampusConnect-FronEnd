import { AuthContext } from '@/components/authProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NotAuth } from '@/pages/erro404/notAuth';
import { useContext } from 'react';
import NavBar from './page-forum/navbar';

export default function EditarPerfil() {
  const auth = useContext(AuthContext);

  return auth?.user ? (
    <div>
      <NavBar />
      {/* <div className='mt-10 h-screen flex items-center flex-col justify-start'>
        <section className=' p-4 w-[90%] md:w-[70%] lg:w-1/2 mx-auto bg-white shadow-[rgba(0,_0,_0,_0.35)_0px_4px_8px] rounded-lg'>
          <div className='flex flex-col'>
            <span className='text-purple-800 font-semibold text-2xl'>Editar Perfil</span>
            <span className='text-sm text-zinc-500'>Atualize suas informações pessoais e acadêmicas</span>
          </div>
          <form className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 '>
            <div>
              <label htmlFor='nome-completo' className='text-purple-600 font-medium text-sm'>
                Nome Completo
              </label>
              <Input id='nome-completo' className='w-full' />
            </div>
            <div>
              <label htmlFor='email-academico' className='text-purple-600 font-medium text-sm'>
                E-mail acadêmico
              </label>
              <Input id='email-academico' className='w-full' />
            </div>
            <div>
              <label htmlFor='matricula' className='text-purple-600 font-medium text-sm'>
                Matrícula
              </label>
              <Input id='matricula' className='w-full' />
            </div>
            <div>
              <label htmlFor='curso' className='text-purple-600 font-medium text-sm'>
                Curso
              </label>
              <Input id='curso' className='w-full' />
            </div>
            <div className='col-span-2'>
              <label htmlFor='biografia' className='text-purple-600 font-medium text-sm'>
                Biografia
              </label>
              <Textarea id='biografia' className='w-full min-h-20 max-h-28 border-[1.5px] border-zinc-400' />
            </div>
            <div>
              <label htmlFor='qual-seu-semestre' className='text-purple-600 font-medium text-sm'>
                Qual seu Semestre
              </label>
              <Input id='qual-seu-semestre' className='w-full' />
            </div>
            <div>
              <label htmlFor='cidade' className='text-purple-600 font-medium text-sm'>
                Cidade
              </label>
              <Input id='cidade' className='w-full' />
            </div>
            <Button type='submit' className='mt-5 w-full col-span-2 bg-purple-600 hover:bg-purple-700'>
              Salvar Alterações
            </Button>
          </form>
        </section>
      </div> */}
      <div className='min-h-screen bg-gradient-to-b p-4 flex items-start justify-center'>
        <Card className='w-full max-w-3xl'>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais e acadêmicas</CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='fullName'>Nome Completo</Label>
                  <Input id='fullName' type='text' placeholder='Digite seu nome completo' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>E-mail</Label>
                  <Input id='email' type='email' placeholder='Digite seu nome completo' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='registration'>Matrícula</Label>
                  <Input id='registration' type='text' placeholder='Digite seu nome completo' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='course'>Curso</Label>
                  <Input id='course' placeholder='Digite seu curso' />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='bio'>Biografia</Label>
                <Textarea id='bio' placeholder='Conte um pouco sobre você' className='min-h-[120px]' />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='semester'>Qual seu Semestre</Label>
                  <Input id='semester' placeholder='Digite seu semestre atual' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='city'>Cidade</Label>
                  <Input id='city' placeholder='Digite sua cidade' />
                </div>
              </div>

              <Button className='w-full bg-purple-600 hover:bg-purple-700'>Salvar Alterações</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <NotAuth />
  );
}
