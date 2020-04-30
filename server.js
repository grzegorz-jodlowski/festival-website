const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const port = 8000;

app.get('/testimonials', (req, res) => res.send(db));
app.get('/testimonials/:id', (req, res) => res.send(db[req.params.id]));
app.get('/testimonials/random', (req, res) => res.send(db[Math.floor(Math.random() * (db.length))]));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))