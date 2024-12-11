import { AuthProvider } from '@/components/authProvider';
import { NotFound } from '@/pages/erro404/notFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cadastrar from './pages/cadastrar';
import Login from './pages/login';
import Forum from './pages/page-forum/forum';
import EditarPerfil from './pages/perfil';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='w-full h-screen font-inter'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastrar' element={<Cadastrar />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/perfil' element={<EditarPerfil />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
