# Backend Outsera

API que lê os filmes de `storage/Movielist.csv` e retorna os intervalos calculados por produtor pela rota `GET /`.

## Tecnologias principais

- Node.js e TypeScript, com módulos ESM e execução direta de arquivos `.ts`.
- Fastify para o servidor HTTP e as rotas.
- `csv-parse` para leitura do CSV, disponível pela dependência `async-csv`.
- Jest e injeção de requisições do Fastify para testes de integração.

## Como executar

Utilize Node.js 24 e npm. Na pasta `backend`, instale as dependências:

```bash
npm i
```

Inicie o servidor:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`:

```bash
curl http://localhost:3000/
```

Execute os comandos na pasta `backend`, pois o caminho do CSV é relativo a ela. Não é necessário configurar banco de dados ou variáveis de ambiente.

O `tsconfig.json` está configurado para verificar os tipos sem gerar JavaScript, pois o script de inicialização usa `node server.ts`. O compilador TypeScript ainda não está declarado nas dependências de desenvolvimento.

## Testes

```bash
npm run test:integration
```

O Jest executa os arquivos `tests/**/*.spec.ts` com suporte a ESM e remoção de tipos pelo próprio Node.js. O teste faz uma requisição à rota `GET /`, lê o CSV real e valida o formato da resposta e a consistência dos intervalos, sem abrir uma porta HTTP.

`app.ts` exporta a função `buildApp`, usada pelos testes; `server.ts` inicia o servidor na porta 3000. O Node.js pode emitir avisos sobre os recursos experimentais usados na execução dos testes.
