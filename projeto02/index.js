const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

games = [
  'Detroid: Become Human',
  'The Last of Us',
  'God of War',
  'Life is Strange',
  'Gris',
  'Last Stop',
  'Oris and the Blind Forest',
  'Darkest Dungeon',
  'My Child Lebensborn',
  'The Medium',
  'Twin Mirror'
];

mensagens = [
  'Bem vindo(a), esta app contem games que eu gosto! Para acessar todos os games [/games] Para acessar um filme [/games/id]',
  'Bem vindo(a), aqui contem games! Rotas: [/games] [/games/id]',
  'Bem vindo(a), voce acessou a rota [/]! Acesse outras como [/games] [/games/id]',
  'Sem boas vindas. Rotas: [/games] [/games/id]',
  'Todas as rotas dessa app: [/games] [/games/id]',
];

function randomMinMax(min,max){
  return Math.floor(Math.random() * (max - min)) + min;
};

function infoRandom(lista, num){
  return lista[num];
};

app.get('/', (req, res) =>{
  res.send(infoRandom(mensagens,randomMinMax(0,mensagens.length)));
});

app.get('/games', (req, res) =>{
  res.send(games);
});

app.get('/games/:id', (req, res) =>{
  const id = req.params.id - 1;
  const game = games[id];
  if(!game) {
    res.status(404).send({
      message:"Jogo não encontrado. Tente novamente."
    });
    return;
  }
  res.send(game);
});

app.get('/game-aleatorio', (req, res) =>{
  res.send(`<h1>Essa pagina gera um dos games de forma aleatoria:</h1> <p>${infoRandom(games,randomMinMax(0,games.length))}</p>`);
});

app.listen(port, () =>{
  console.info(`App rodando, ctrl + click: http://localhost:${port}/`);
});