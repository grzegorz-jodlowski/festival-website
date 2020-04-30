const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const port = 8000;

app.get('/testimonials', (req, res) => res.json(db));
app.get('/testimonials/random', (req, res) => res.json(db[Math.floor(Math.random() * (db.length))]));
app.get('/testimonials/:id', (req, res) => res.json(db[req.params.id]));

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  db.push({
    id: uuidv4(),
    author,
    text,
  })
  res.json({ message: 'OK' });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))