# Front Test Outsera

Aplicação web para consultar filmes e estatísticas de vencedores, consumindo a API do desafio Outsera.

## Tecnologias utilizadas

- **React 19 e React DOM**: construção da interface com componentes funcionais e hooks (`useState` e `useEffect`).
- **React Router DOM 7**: navegação entre o dashboard e a listagem, com destaque da rota ativa.
- **Axios**: requisições HTTP à API.
- **Lucide React**: ícones dos controles de paginação.
- **Vite 8**: servidor de desenvolvimento e geração do build de produção.
- **ESLint**: análise estática do código, com regras para React Hooks e React Refresh.
- **JavaScript (JSX) e CSS próprio**: implementação e estilização da interface, incluindo tabelas e adaptação a telas menores.

## Principais recursos

### Dashboard — `/`

- Tabela de anos com mais de um vencedor.
- Top 3 estúdios com mais vitórias.
- Produtores com os maiores e menores intervalos entre vitórias.
- Busca de filmes vencedores por ano.

### Listagem — `/list`

- Tabela de filmes com ID, ano, título e indicação de vencedor.
- Controles de filtro por ano e por vencedor.
- Paginação com 10 filmes por página.

## Pré-requisitos

- Node.js 22.12 ou superior. O Vite utilizado também aceita Node.js 20 a partir da versão 20.19.
- npm instalado junto ao Node.js.
- Acesso à internet para instalar as dependências e consultar a API.

## Como executar

Na pasta do projeto, instale as dependências usando o arquivo de lock:

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço informado no terminal, normalmente `http://localhost:5173`.

- Dashboard: `http://localhost:5173/`
- Listagem: `http://localhost:5173/list`

Se a porta estiver ocupada, utilize a porta alternativa indicada pelo Vite.

## Comandos disponíveis

| `npm run dev` | Executar o servidor de desenvolvimento. |


Abra o endereço exibido no terminal, normalmente `http://localhost:4173`.

## Integração com a API

A aplicação consulta diretamente a API externa:

```text
https://challenge.outsera.tech/api/movies
```

A URL está definida em `src/App.jsx` e `src/List.jsx`. Atualmente, não é necessário configurar um arquivo `.env` nem executar um backend local. A exibição dos dados depende da disponibilidade da API.

## Estrutura principal

```text
src/
├── main.jsx    # Inicialização, navegação e definição das rotas
├── App.jsx     # Dashboard e consultas de estatísticas
├── List.jsx    # Listagem, filtros e paginação
├── App.css     # Estilos dos componentes e tabelas
└── index.css   # Estilos globais
```
