const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

//Inicializa a tabela

db.serialize(() => {
  db.run("CREATE TABLE cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)");
  db.run("CREATE TABLE dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)");
});

function novoanimal(req, res, tableName) {
  console.log
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Nome é obrigatório");
  }

  db.run(`INSERT INTO ${tableName} (name, votes) VALUES (?, 0)`, [name], function(err) {
    if (err) {
      return res.status(500).send("Erro ao inserir no banco de dados");
    }
    res.status(201).json({ id: this.lastID, name, votes: 0 });
  });
}

app.post('/cats', (req, res) => {
  novoanimal(req, res, "cats");
});

app.post('/dogs', (req, res) => {
  novoanimal(req, res, "dogs");
});

app.post('/vote/:animalType/:id', (req, res) => {
  const { animalType, id } = req.params;
  if (animalType !== 'cats' && animalType !== 'dogs') {
    return res.status(400).send('Tipo de animal inválido');
  }

  db.run(`UPDATE ${animalType} SET votes = votes + 1 WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(500).send("Erro ao atualizar o banco de dados");
    }
    if (this.changes === 0) {
      const animalName = animalType === 'cats' ? 'gato' : 'cachorro'
      return res.status(404).send(`O ${animalName} com o ID de ${id} não foi encontrado`);
    }
    res.status(200).send("Voto computado");
  });
});


function todosAnimais(req, res, tableName) {
  db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
    if (err) {
      return res.status(500).send("Erro ao consultar o banco de dados");
    }
    res.json(rows);
  });
}

app.get('/dogs', (req, res) => {
  todosAnimais(req, res, "dogs");
});


app.get('/cats', (req, res) => {
  todosAnimais(req, res, "cats");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});
