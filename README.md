
# Campus-Connect 🚀

[![Express.js](https://img.shields.io/badge/Express.js-green.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-purple.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-red.svg)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-orange.svg)](https://www.npmjs.com/package/bcrypt)

## Estrutura do Projeto 📁

```
CampusConnect-Frontend/ 
📦 root/
├── 📁 src/                # Código-fonte principal 
│   ├── 📁 assets/         # Recursos estáticos (imagens, fontes, etc.) 
│   ├── 📁 components/     # Componentes reutilizáveis 
│   │   ├── 📁 ui/         # Componentes de UI (interface do usuário) 
│   ├── 📁 interface/      # Interfaces TypeScript 
│   ├── 📁 lib/            # Utilitários ou bibliotecas customizadas 
│   ├── 📁 pages/          # Páginas da aplicação 
│   ├── 📁 services/       # Serviços de conexão e comunicação com a API
│   ├── 📄 App.tsx         # Componente principal do React 
│   ├── 📄 index.css       # Estilo global 
│   ├── 📄 main.tsx        # Ponto de entrada da aplicação 
│   └── 📄 vite-env.d.ts   # Tipagens específicas do Vite 
├── 📄 .editorconfig       # Configuração do editor 
├── 📄 .env                # Variáveis de ambiente 
├── 📄 .gitignore          # Arquivos ignorados pelo Git 
├── 📄 package.json        # Dependências e scripts do projeto 
├── 📄 package-lock.json   # Versões fixas das dependências 
├── 📄 tsconfig.json       # Configuração do TypeScript 
├── 📄 vite.config.ts      # Configuração do Vite 
├── 📄 tailwind.config.js  # Configuração do Tailwind CSS 
├── 📄 vercel.json         # Configuração de deploy na Vercel 
└── 📄 README.md           # Documentação do projeto
```

## Pré-requisitos 📋

Antes de começar, certifique-se de que você instalou:

- Node.js (v18 ou superior)
- npm (v9 ou superior)
- Git (versão mais recente)

## Instalação ⚙️

1. Clone o repositório:
```bash
git clone https://github.com/JulianoL13/CampusConnect-BackEnd
cd CampusConnect-BackEnd
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` no diretório raiz e adicione suas variáveis de ambiente:
```env
VITE_BACKEND_URL="sua-url-do-banco-de-dados"
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev     # Modo de desenvolvimento com hot-reload
```

### Tecnologias Principais
- **Framework:** [React](https://react.dev/) - Biblioteca JavaScript para criar interfaces de usuário.
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) - Extensão do JavaScript com suporte à tipagem estática.
- **Biblioteca** [TailwindCSS](https://tailwindcss.com/) - Framework CSS para estilização rápida e eficiente.
- **ShadncUI** [ShadncUI](https://ui.shadcn.com/) - Biblioteca de componentes integrados ao TailwindCSS.

### Ferramentas de Desenvolvimento
- **Editor de Código:** VSCode
- **Gerenciador de Pacotes:** npm
- **Controle de Versão:** Git
- **Qualidade de Código:**
  - Prettier - Para formatação de código
  - TypeScript compiler - Para verificação estática de tipos

### Desenvolvimento de API
- **Manipulação de Requisições:** Express.js Router
- **Documentação de API:** Swagger/OpenAPI

## Contribuindo 🤝

Contribuições são bem-vindas! Por favor, veja nossas [Diretrizes de Contribuição](https://github.com/JulianoL13/CampusConnect-BackEnd/blob/main/COLLABORATION.md) para mais detalhes.

1. Faça um fork do repositório
2. Crie sua branch para a feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adicione uma nova funcionalidade'`)
4. Faça o push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Equipe ✨

### Equipe Frontend
- [Carlos Eduardo Albuquerque](https://github.com/CarllosEduardo07) - Desenvolvedor Frontend
- [Thiago Miranda](https://github.com/Thiiagodev) - Desenvolvedor Frontend

### Equipe Backend
- [Juliano Laranjeira](https://github.com/JulianoL13) - Desenvolvedor Backend Líder
- [Pablo Montes](https://github.com/itspablomontes) - Desenvolvedor Backend

## Licença 📄

Este projeto está licenciado sob a Licença GPL-3.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos 🙏

### Agradecimentos Especiais
- À Wyden FACIMP, pelo suporte e recursos fornecidos para nós, estudantes
- Ao professor Wellinton, que nos guiou durante o processo de desenvolvimento
- À comunidade open-source pelas incríveis ferramentas e bibliotecas que tornaram este projeto possível

### Suporte ao Desenvolvimento
- Obrigado à comunidade [React](https://react.dev/) pela excelente documentação
- Obrigado à equipe [TypeScript](https://www.typescriptlang.org/) pelo incrível sistema de tipos
- Obrigado à equipe [TailwindCSS](https://tailwindcss.com/docs/installation) pela biblioteca de CSS incrível
- **ShadncUI** [ShadncUI](https://ui.shadcn.com/) - por construir uma biblioteca de componentes top.


### Design & Inspiração
- Inspirado na necessidade de melhorar a conectividade e interação dos alunos no campus
- Design UI/UX inspirado por plataformas educacionais modernas

### Contribuidores
- Obrigado a todos os alunos que participaram dos testes
- Obrigado a todos que relataram bugs e sugeriram funcionalidades

---
Feito com ❤️ pela equipe Campus-Connect
