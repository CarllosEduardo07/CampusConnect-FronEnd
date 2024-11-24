import { NewComentario } from '@/interface/newComentario';
import { PostNew } from '@/interface/posts';
import { UsersInterface } from '@/interface/usersInterface';
import { UserSchema } from '@/pages/cadastrar';
import axios from 'axios';

// const url = "http://localhost:3000";
const url = 'https://api-campusconnect.up.railway.app';

// Posts
export const getPosts = async () => {
  const response = await axios.get(`${url}/api/posts`);
  return response.data;
};

export const createPosts = async (postNew: PostNew) => {
  const response = await axios.post(`${url}/api/posts`, postNew);
  return response.data;
};

// Usuarios
export const getUser = async () => {
  const response = await axios.get(`${url}/api/users`);
  return response.data;
};
export const getUserPorId = async (id: UsersInterface) => {
  const response = await axios.get(`${url}/api/users/${id}`);
  return response.data;
};

export const createUser = async (user: UserSchema) => {
  const response = await axios.post(`${url}/auth/register`, user);
  return response.data;
};

// Perfil
export const getPerfilPorId = async (id: number) => {
  const response = await axios.get(`${url}/api/profile/${id}`);
  return response.data;
};

// Comentarios
export const getComentarios = async () => {
  const response = await axios.get(`${url}/api/comments`);
  return response.data;
};

export const getComentariosPorIdDoPost = async (id: any) => {
  const response = await axios.get(`${url}/api/comments/post/${id}`);
  return response.data;
};
export const CreateComentarioNoPost = async (newComentario: NewComentario) => {
  const response = await axios.post(`${url}/api/comments`, newComentario);
  return response.data;
};

//deletar
export const apagarPost = async (id: any) => {
  const response = await axios.delete(`${url}/api/posts/${id}`);
  return response.data;
};
export const apagarComentario = async (id: any) => {
  const response = await axios.delete(`${url}/api/comments/${id}`);
  return response.data;
};
