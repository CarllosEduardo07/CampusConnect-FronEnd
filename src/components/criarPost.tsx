import { AuthContext } from '@/components/authProvider';
import { PostNew } from '@/interface/posts';
import { createPosts } from '@/services/conexao';
import { CirclePlus } from 'lucide-react';
import { useContext, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function CriarPost({ onPostCreated }: any) {
  const auth = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o usuário está logado
    if (!auth?.user?.profileId) {
      alert('Por favor, faça login antes de criar um post.');
      return;
    }

    const newPost: PostNew = {
      title,
      text,
      profileId: Number(auth?.user?.profileId),
      communityId: 1,
    };

    await createPosts(newPost);

    // Limpar os campos após o envio
    try {
      const response = await createPosts(newPost);
      console.log('Post Criado com Sucesso', response);

      // Limpar os campos após o envio
      setIsModalOpen(false);
      setTitle('');
      setText('');

      // Recarregar o componente pai (se necessário)
      onPostCreated();
    } catch (error: any) {
      console.error('Erro ao criar post:', error);
      alert(`Erro ao criar post: ${error.response?.data?.message || 'Erro desconhecido.'}`);
    }
  };
  return (
    <>
      {/* Criar Post */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button className='md:w-36 flex items-center text-sm font-medium text-white md:px-3 md:py-2 md:gap-x-2 bg-purple-600 rounded-md w-44 p-2 gap-x-1 '>
            <CirclePlus strokeWidth={1.5} size={18} absoluteStrokeWidth />
            Criar Post
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-xl text-center font-semibold'>Adicione um Novo Post no Feed</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4 py-4'>
            <Input
              placeholder='Título do post'
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />

            <Textarea
              placeholder='Conteúdo do post'
              className='h-32 border-[1.5px] border-zinc-400 min-h-32 max-h-60'
              value={text}
              onChange={e => {
                setText(e.target.value);
              }}
            />
            <DialogFooter>
              <Button type='submit' className='w-full bg-purple-700 hover:bg-purple-800'>
                Publicar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
