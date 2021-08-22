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

app.post('/games', (req, res) =>{
  const game = req.body.game;
  const id = games.length + 1;

  games.push(game);
  res.send(`Jogo adicionado com sucesso:${game}. O ID do game é ${id}`);
});

app.put('/games/:id', (req, res) =>{
  const id = req.params.id -1;
  const game = req.body.game;
  const nomeAnterior = games[id];

  games[id] = game;
  res.send(`Jogo anterior: ${nomeAnterior}, atualizado para: ${game}`);
});

// app.delete('/games/:id', (req, res) =>{
//   const id = req.params.id - 1;

//   if (id > games.length || id < 0) {
//     res.send('Jogo nao encontrado. Tente novamente com outro ID.');
//   } else {
//     delete games[id];
//     res.send('Jogo excluido com sucesso!');
//   }
  
// });

app.delete('/games/:id', (req, res)=>{
  const id = req.params.id - 1;
  games.splice(id, 1)
  res.send("Jogo excluido com sucesso.")
  // colocar verificacao
});

app.listen(port, () =>{
  console.info(`App rodando, ctrl + click: http://localhost:${port}/`);
});