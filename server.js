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
app.get('/testimonials/:id', (req, res) => res.json(db.find(el => el.id == req.params.id)));

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    db.push({
      id: uuidv4(),
      author,
      text,
    })
    res.json({ message: 'OK' });
  }
  else {
    res.send('You can\'t leave fields empty!')
  }
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;

  const dbRecord = db.find(el => el.id == req.params.id)

  db.splice(db.indexOf(dbRecord), 1, { ...dbRecord, author: author || dbRecord.author, text: text || dbRecord.text });

  res.json({ message: 'OK' });

});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(db.indexOf(db.find(el => el.id == req.params.id)), 1);
  res.json({ message: 'OK' });
});

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not found...' })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))