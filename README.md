<h1>Desafio Coopers</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/typeorm-%23000000.svg?style=for-the-badge&logo=typeormt&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Desafio

- Contrução de sistema de autenticação por token
- CRUD de usuários 
- CRUD de Todo

### Documentação da API

```
- GET /users retorna a lista de usuarios cadastrados

- POST /users cadastra novo usuario
  - name
  - username
  - password

- PUT /users/[id] atualiza dado do usuario
  - name
  - username
  - *Necessario passar o BearerToken*

- DELETE /users/[id] deleta um usuario
  - id
  - *Necessario o usuario não ter nenhum post cadatrado*
  - *Necessario passar o BearerToken*
```
```
- GET /todo retorna lista de todo do usuário logado
  - id
  - text
  - done
  - user
  - *Necessario passar o BearerToken*

- POST /todo cadastra um novo todo
  - text
  - *Necessario passar o BearerToken*

- PUT /todo/[id] atualiza um todo
  - text
  - done
  - *Necessario passar o BearerToken*

- DELETE /todo/[id] deleta um todo
  - *Necessario passar o BearerToken*
```
```
- POST /auth/login realiza login
  - username
  - password
  - *Necessario passar o BearerToken*
```
<span style="font-size: 20px">OBS:
  - Para exclusão de um usuario é necessario que o usuario não tenha nenhum todo cadastro;
  - Apenas o proprio usuario que fez o todo que pode realizar edição e atualização e exclusão, da mesma maneria o todo</span>

### Requerimentos

- Nodejs: 18.12.0

## Instalação

```bash
$ git clone https://github.com/JoaoVictorViana/coopers-api.git
$ cd coopers-api
$ yarn
```

## Rodando o codigo

```bash
# Utilizando NPM:
# Necessário criar o arquivo .env com base no .env-example

yarn start
```

```bash
# Utilizando docker:

docker build -t nestjs-docker .
docker run -p 3000:3000 nestjs-docker

```
