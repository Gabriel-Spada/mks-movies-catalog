<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  
# CRUD Catálago de filmes para o processo MKS Backend

Este projeto é uma API CRUD (Create, Read, Update, Delete) de filmes com autenticação JWT (JSON Web Tokens), construída utilizando NestJS, TypeORM, PostgreSQL e Docker. A API permite gerenciar uma coleção de filmes, onde os usuários autenticados podem adicionar, visualizar, atualizar e remover filmes.

## Tecnologias

- TypeScript
- Nest.js
- TypeORM
- Swagger
- JWT
- Docker
- Redis
- Postgresql

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js (versão 18.x ou superior)
- Npm
- Docker

## Deploy


- [`Url swagger`](https://free-inspired-goshawk.ngrok-free.app)

Provavelmente estará desativado pois está rodando como um servidor local para poupar custos.

## Para rodar o projeto localmente

1. **Clonando o Repositório:**

   ```bash
   git clone https://github.com/Gabriel-Spada/mks-movies-catalog.git
   ```

2. **Instalando Dependências:**

   ```bash
   cd nome-do-repositorio
   npm install
   ```

3. **Configurando as Variáveis de Ambiente:**

   Renomeie o arquivo `.env.example` para `.env`.

## Docker

1. **Iniciando os Contêineres:**

   No diretório raiz do projeto, execute o seguinte comando para iniciar os contêineres Docker (NestJS + PostgreSQL + Redis + Adminer):

   ```bash
   docker-compose up
   ```

2. **Acessando a API:**

   A API estará disponível [`aqui`](http://localhost/docs).

   ``` 
3. **Acessando o banco:**

      Utilize o adminer para vizualizar o banco.
    [`aqui`](http://localhost:8080).
   System:PostgreSQL
   Server: postgres
   Username: postgres 
   Password: {DB_PASSWORD}
   Database: movies

    
   
## Estrutura do Projeto

```
src/
|-- auth/                      # Módulo de autenticação (JWT)
|-- user/                      # Módulo de usuário
|-- default/                   # Default controller para checar o status do servidor
|-- common/                    # Recursos facilitadores
|-- movies/                    # Módulo de gerenciamento de filmes
|-- main.ts                    # Ponto de entrada da aplicação
|-- app.module.ts              # Módulo raiz da aplicação
```

## Endpoints da API

O projeto possui documentação com [`swagger`](http://localhost/docs). Na documentação será possível visualizar todos os endpoints, seus requerimentos para requisição e seus retornos.

## Considerações

O projeto foi desenvolvido para o processo seletivo de Desenvolvedor Backend na MKS baseado nas tecnologias solicitadas, estou acostumado a desenvolver utilizando Nestjs porém com Graphql ao invés utilizando REST somente para recebimento de arquivos, gostaria de evidênciar pontos como a lógica de entidade de usuário para que não seja retornada a hash da senha provavelmente seja melhor implementar um automapper para resolver.

## Tempo de Experiência com Tecnologias

- TypeScript - 2 anos.
- Nest.js - 2 anos.
- TypeORM - 2 anos.
- JWT - 3 anos.
- Swagger - 3 anos.
- Docker - 3 anos.
- Redis - 2 anos.
- Postgresql - 6 meses.
## Autor

Este projeto foi desenvolvido por Gabriel Spada.

- LinkedIn: [Gabriel Spada](https://www.linkedin.com/in/gabriel-spada-b2b676219/)
- GitHub: [Gabriel-Spada](https://github.com/Gabriel-Spada)