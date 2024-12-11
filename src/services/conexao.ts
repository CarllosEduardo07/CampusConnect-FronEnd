import { NewComentario } from '@/interface/newComentario';
import { PostNew } from '@/interface/posts';
import { UsersInterface } from '@/interface/usersInterface';
import { UserSchema } from '@/pages/cadastrar';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

//configuração do axios
const api = axios.create({
  baseURL: url,
});

//colocando o token em todas as requisições de todas as rotas
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Obter o token do localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adicionar o token no cabeçalho
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

//login
export const postLogin = async (newLogin: any) => {
  const response = await api.post(`/auth/login`, newLogin);
  return response.data;
};

// Posts
export const getPosts = async () => {
  const response = await api.get(`/api/posts`);
  return response.data;
};

export const createPosts = async (postNew: PostNew) => {
  const response = await api.post(`/api/posts`, postNew);
  return response.data;
};

// Usuarios
export const getUser = async () => {
  const response = await api.get(`/api/users`);
  return response.data;
};
export const getUserPorId = async (id: UsersInterface) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (user: UserSchema) => {
  const response = await api.post(`/auth/register`, user);
  return response.data;
};

// Perfil
export const getPerfilPorId = async (id: number) => {
  const response = await api.get(`/api/profile/${id}`);
  return response.data;
};

// Comentarios
export const getComentarios = async () => {
  const response = await api.get(`/api/comments`);
  return response.data;
};

export const getComentariosPorIdDoPost = async (id: any) => {
  const response = await api.get(`/api/comments/post/${id}`);
  return response.data;
};
export const CreateComentarioNoPost = async (newComentario: NewComentario) => {
  const response = await api.post(`/api/comments`, newComentario);
  return response.data;
};

//deletar
export const apagarPost = async (id: any) => {
  const response = await api.delete(`/api/posts/${id}`);
  return response.data;
};
export const apagarComentario = async (id: any) => {
  const response = await api.delete(`/api/comments/${id}`);
  return response.data;
};
