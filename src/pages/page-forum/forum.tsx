import { ApagarPostAlert } from '@/components/apagarPost-alert';
import { Comentarios } from '@/components/comentarios';
import { CriarPost } from '@/components/criarPost';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/interface/posts';
import { PerfilInterface } from '@/interface/usersInterface';
import { apagarPost, getComentariosPorIdDoPost, getPerfilPorId, getPosts } from '@/services/conexao';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowBigDown, ArrowBigUp, FilePenLine, MessageCircleMore } from 'lucide-react';
import { useEffect, useState } from 'react';
import NavBar from './navbar';

// Configura o dayjs para usar o plugin
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPosts, setSearchPosts] = useState('');
  const [commentsVisibility, setCommentsVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [usuarios, setUsuarios] = useState<{ [key: string]: PerfilInterface }>({});
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>({});

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();

      const usuariosMap: { [key: string]: PerfilInterface } = {};

      if (Array.isArray(fetchedPosts)) {
        // Usando 'for' em vez de 'forEach'
        for (const post of fetchedPosts) {
          if (!usuariosMap[post.profileId]) {
            try {
              const usuarioResponse = await getPerfilPorId(post.profileId);

              if (usuarioResponse.success) {
                usuariosMap[post.profileId] = usuarioResponse.data;
              }
            } catch (error) {
              console.warn(`Usuário com ID ${post.profileId} não encontrado.`);
              usuariosMap[post.profileId] = {
                id: post.profileId,
                name: 'Usuário excluído',
                bio: '',
                pic: '',
              };
            }
          }

          // Carregar a contagem de comentários para o post
          await fetchCommentsCount(post.id);
        }

        // Ordenar os posts mais recentes e formatar as datas
        const formattedSortedPosts = fetchedPosts
          .sort((a: Post, b: Post) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
          .map((post: Post) => ({
            ...post,
            createdAt: dayjs(post.createdAt).fromNow(),
          }));

        setPosts(formattedSortedPosts);
        setUsuarios(usuariosMap);
        setLoading(false); // Dados carregados, altera o estado de carregamento
      }
    } catch (error) {
      console.log('Erro ao carregar Posts:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // Função para buscar o total de comentários
  const fetchCommentsCount = async (postId: string) => {
    try {
      const comentarios = await getComentariosPorIdDoPost(postId);
      setCommentsCount(prev => ({
        ...prev,
        [postId]: comentarios.length, // Atualiza apenas o total de comentários desse post
      }));
    } catch (error) {
      console.error(`Erro ao carregar a contagem de comentários para o post ${postId}:`, error);
    }
  };

  const deletarPost = async (id: any) => {
    try {
      await apagarPost(id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Erro ao apagar o post:', error);
      alert('Não foi possível apagar o post. Tente novamente mais tarde.');
    }
  };

  const filteredPost = posts.filter(post => post.title.toLowerCase().includes(searchPosts.toLowerCase()));
  //includes é um método de string que verifica se o texto da string (post.title.toLowerCase()) contém a substring especificada (searchPosts.toLowerCase()).

  const toggleComentarios = (postId: string) => {
    setCommentsVisibility(prevState => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className='pb-20'>
      <NavBar />

      <div className='relative mt-5 mx-auto md:max-w-3xl max-w-sm flex items-center gap-x-4'>
        <Input
          className='shadow-[rgba(0,_0,_0,_0.24)_0px_4px_6px]'
          placeholder='Pesquisar posts'
          autoFocus
          value={searchPosts}
          onChange={e => {
            setSearchPosts(e.target.value);
          }}
        />
        {/* {searchPosts && (
          <button
            className='absolute right-3 text-zinc-600 hover:text-zinc-900'
            onClick={() => setSearchPosts('')} // Limpar o campo
          >
            X
          </button>
        )} */}

        {/* Passa fetchPosts para o CriarPost, para atualizar o feed quando for criado */}
        <CriarPost onPostCreated={fetchPosts} />
      </div>
      {loading
        ? Array(4) // Número de skeletons para simular o número de posts
            .fill(null)
            .map((_, index) => (
              // Exibe o Skeleton durante o carregamento
              <Skeleton key={index} className='bg-white p-10 mt-10 w-[95%] lg:w-[70%] mx-auto flex flex-col items-start space-y-5 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_4px_8px]'>
                <article className='flex gap-x-8'>
                  <Skeleton className='w-8 h-36 space-y-5 flex flex-col items-center'></Skeleton>

                  <article className='space-y-4'>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-[250px] md:w-[600px] lg:w-[1000px] '></Skeleton>
                      <Skeleton className='h-4 w-[100px]'></Skeleton>
                    </div>
                    <Skeleton className='h-20 w-full'></Skeleton>
                  </article>
                </article>
                <article>
                  <Skeleton className='h-4 w-[100px]'></Skeleton>
                </article>
              </Skeleton>
            ))
        : filteredPost.map(post => (
            <section key={post.id} className='bg-white p-5 md:p-10 mt-10 w-[95%] lg:w-[70%] mx-auto flex flex-col items-start space-y-7 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_4px_8px]'>
              <article className='flex items-start gap-x-8 w-full'>
                <div className='space-y-2 flex flex-col items-center'>
                  <ArrowBigUp strokeWidth={1.5} size={30} absoluteStrokeWidth className='cursor-pointer text-zinc-600 hover:text-zinc-900' />
                  <span>0</span>
                  <ArrowBigDown strokeWidth={1.5} size={30} absoluteStrokeWidth className='cursor-pointer text-zinc-600 hover:text-zinc-900' />
                </div>

                <article className=' space-x-1 w-full text-xs text-zinc-500 flex flex-col '>
                  <div className='space-y-1'>
                    <h1 className='text-base md:text-xl text-purple-700 font-semibold'>{post.title}</h1>
                    <p>
                      <strong>{usuarios[post.profileId]?.name || 'Nome não encontrado'} • </strong>
                      {post.createdAt}
                    </p>
                  </div>
                  <h2 className='text-zinc-600 mt-6 text-sm'>{post.text}</h2>
                </article>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>...</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <FilePenLine />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        {/* passando a função para outro componente */}
                        <ApagarPostAlert onDelete={() => deletarPost(post.id)} />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </article>

              {/* Button de comentarios */}
              <span
                className='flex gap-x-2 cursor-pointer text-zinc-600 hover:text-zinc-900 font-semibold text-sm'
                onClick={() => {
                  toggleComentarios(post.id);
                }}
              >
                <MessageCircleMore strokeWidth={1.5} size={20} absoluteStrokeWidth />
                {commentsCount[post.id] || 0} Comentários
              </span>
              {commentsVisibility[post.id] && (
                <article className='w-full'>
                  {/* Seção de comentarios  */}
                  <Comentarios postId={post.id} usuarios={usuarios} />
                </article>
              )}
            </section>
          ))}
    </div>
  );
}
