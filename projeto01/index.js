const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

filmes = [
  'It - A Coisa',
  'Coraline e o Mundo Secreto',
  'Black Mirror: Bandersnatch',
  'O Espetacular Homem-Aranha',
  'Matrix'
]

mensagens = [
  'Bem vindo(a), esta app contem filmes que eu gosto! Para acessar todos os filmes [/filmes] Para acessar um filme [/filmes/id]',
  'Bem vindo(a), aqui contem filmes! Rotas: [/filmes] [/filmes/id]',
  'Bem vindo(a), voce acessou a rota [/]! Acesse outras como [/filmes] [/filmes/id]',
  'Sem boas vindas. Rotas: [/filmes] [/filmes/id]',
  'Todas as rotas dessa app: [/filmes] [/filmes/id]',
]

function randomMinMax(min,max){
  return Math.floor(Math.random() * (max - min)) + min;
};

function mensagensParaInicial(num){
  return mensagens[num];
};

app.get('/', (req, res) =>{
  res.send(mensagensParaInicial(randomMinMax(0,mensagens.length)));
});

app.get('/filmes', (req, res) =>{
  res.send(filmes);
});

app.get('/filmes/:id', (req, res) =>{
  const id = req.params.id - 1;
  const filme = filmes[id];
  if(!filme) {
    res.status(404).send({
      message:"Filme não encontrado. Tente novamente."
    });
    return;
  }
  res.send(filme);
});

app.listen(port, () =>{
  console.info(`App rodando, ctrl + click: http://localhost:${port}/`);
});