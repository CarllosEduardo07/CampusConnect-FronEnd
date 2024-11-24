import { ComentariosInterface } from '@/interface/comentariosInterface';

import { apagarComentario, CreateComentarioNoPost, getComentariosPorIdDoPost } from '@/services/conexao';
import { ArrowBigDown, ArrowBigUp, Send, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';

import { NewComentario } from '@/interface/newComentario';
import { PerfilInterface } from '@/interface/usersInterface';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface ComentariosProps {
  postId: string;
  usuarios: { [key: string]: PerfilInterface }; // Mapa de usuários passado pelo Forum
}

export function Comentarios({ postId, usuarios }: ComentariosProps) {
  const [comentarios, setComentarios] = useState<ComentariosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchComentariosPorPost = async () => {
      try {
        setLoading(true);

        // Obtém os comentários do post específico
        const fetchedComentarios = await getComentariosPorIdDoPost(postId);

        setComentarios(fetchedComentarios);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log(usuarios);
    

    fetchComentariosPorPost();
  }, [postId]);

  const handleSubmitComentario = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('ERRO: preencha o campo de comentario');
      return;
    }

    const comentarioNew: NewComentario = {
      text,
      profileId: 1,
      postId: postId,
    };

    try {
      const novoComentario = await CreateComentarioNoPost(comentarioNew);

      // Atualizando a lista de comentários para incluir o novo comentário
      setComentarios(prevComentarios => [...prevComentarios, novoComentario]);
      setText('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      alert('Erro ao enviar o comentário.');
    }
  };

  const deletarComentario = async (id: any) => {
    try {
      await apagarComentario(id);
      setComentarios(prevComentario => prevComentario.filter(comentarios => comentarios.id !== id));
    } catch (error) {
      console.error('Erro ao apagar o Comentario:', error);
      alert('Não foi possível apagar o Comentario. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <form onSubmit={e => handleSubmitComentario(e, postId)} className='mt-4 flex items-center gap-2'>
        <Textarea
          className='w-9/12 max-h-32'
          placeholder='Adicione um comentário...'
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <button type='submit' className='flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-md gap-1 text-sm'>
          Enviar
          <Send strokeWidth={1.5} size={20} absoluteStrokeWidth />
        </button>
      </form>
      {loading ? (
        <div className='text-center p-4 mt-5'>
          <p className='text-purple-700 font-bold'>Carregando comentários...</p>
        </div>
      ) : comentarios.length === 0 ? (
        <p className='text-zinc-500 p-4 mt-5 font-bold'>Nenhum comentário disponível.</p>
      ) : (
        comentarios.map(comentario => (
          <section key={comentario.id} className='flex items-start jus gap-x-5 px-5 py-5'>
            {/* likes */}
            <div className='space-y-1 flex flex-col items-center '>
              <ArrowBigUp strokeWidth={1.5} size={22} absoluteStrokeWidth className='cursor-pointer text-zinc-600 hover:text-zinc-900' />
              <span>0</span>
              <ArrowBigDown strokeWidth={1.5} size={22} absoluteStrokeWidth className='cursor-pointer text-zinc-600 hover:text-zinc-900' />
            </div>

            {/* Input para Comentarios */}

            <div className='space-y-2 mt-3'>
              <h4 className='text-zinc-500 text-sm'>
                <strong>{usuarios[comentario.profileId]?.name || 'Usuário desconhecido'}</strong> • {dayjs(comentario.createdAt).fromNow()}
              </h4>
              <p className='text-zinc-600 text-sm'>{comentario.text}</p>
            </div>
            <button type='button' className='flex items-center gap-2 cursor-pointer text-red-700 mt-3' onClick={() => deletarComentario(comentario.id)}>
              <Trash2 strokeWidth={1.3} size={17} absoluteStrokeWidth />
            </button>
          </section>
        ))
      )}
    </>
  );
}
