const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8000;

app.get('/testimonials', (req, res) => res.json(db.testimonials));
app.get('/testimonials/random', (req, res) => res.json(db.testimonials[Math.floor(Math.random() * (db.testimonials.length))]));
app.get('/testimonials/:id', (req, res) => res.json(db.testimonials.find(el => el.id == req.params.id)));

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    db.testimonials.push({
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

  const dbRecord = db.testimonials.find(el => el.id == req.params.id)

  db.testimonials.splice(db.testimonials.indexOf(dbRecord), 1, { ...dbRecord, author: author || dbRecord.author, text: text || dbRecord.text });

  res.json({ message: 'OK' });

});

app.delete('/testimonials/:id', (req, res) => {
  db.testimonials.splice(db.testimonials.indexOf(db.testimonials.find(el => el.id == req.params.id)), 1);
  res.json({ message: 'OK' });
});

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not found...' })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))