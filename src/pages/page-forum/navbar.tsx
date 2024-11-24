import foto_fake from '@/assets/foto_fake.png';
import logo_branca from '@/assets/logo_branca.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function NavBar() {
  return (
    <nav className='bg-purple-600 px-5 md:px-12 py-1 flex items-center justify-between'>
      <a href={`/forum`}>
        <img src={logo_branca} alt='logo' className='w-28 md:w-36' />
      </a>
      <div className='flex justify-center items-center gap-x-5'>
        <DropdownMenu>
          <DropdownMenuTrigger className='border-2 border-purple-700 rounded-full'>
            <img src={foto_fake} alt='foto' className='w-12 rounded-full' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-10 mt-2 bg-white min-w-40 text-sm rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_4px_8px] z-10'>
            <div className='p-2 flex flex-col'>
              <DropdownMenuLabel className='px-2 py-0'>João Silva</DropdownMenuLabel>
              <DropdownMenuLabel className='px-2 py-1 text-xs text-zinc-500'>joao.silva@email.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </div>

            <div className='px-2 gap-y-2 flex flex-col'>
              <a href={`/forum`} className='px-3 py-1 hover:bg-zinc-200 rounded-lg'>
                Home
              </a>
              <a href={`/perfil`} className=' px-3 py-1 hover:bg-zinc-200 rounded-lg '>
                Perfil
              </a>
              <DropdownMenuSeparator />
              <a href={`/`} className='px-3 py-1 hover:bg-zinc-200 rounded-lg '>
                Sair
              </a>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
