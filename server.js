const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8000;

//testimonials
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
    res.json({ message: 'You can\'t leave fields empty!' })
  }
});

app.put('/testimonials/:id', (req, res) => {
  const dbRecord = db.testimonials.find(el => el.id == req.params.id);
  db.testimonials.splice(db.testimonials.indexOf(dbRecord), 1, { ...dbRecord, ...req.body });
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const dbRecord = db.testimonials.find(el => el.id == req.params.id);
  db.testimonials.splice(db.testimonials.indexOf(dbRecord), 1);
  res.json({ message: 'OK' });
});

//concerts
app.get('/concerts', (req, res) => res.json(db.concerts));
app.get('/concerts/random', (req, res) => res.json(db.concerts[Math.floor(Math.random() * (db.concerts.length))]));
app.get('/concerts/:id', (req, res) => res.json(db.concerts.find(el => el.id == req.params.id)));

app.post('/concerts', (req, res) => {
  const { performer } = req.body;

  if (performer) {
    db.concerts.push({ ...req.body, id: uuidv4() })
    res.json({ message: 'OK' });
  }
  else {
    res.json({ message: 'You can\'t leave performer field empty!' })
  }
});

app.put('/concerts/:id', (req, res) => {
  const dbRecord = db.concerts.find(el => el.id == req.params.id)
  db.concerts.splice(db.concerts.indexOf(dbRecord), 1, { ...dbRecord, ...req.body });
  res.json({ message: 'OK' });
});

app.delete('/concerts/:id', (req, res) => {
  const dbRecord = db.concerts.find(el => el.id == req.params.id)
  db.concerts.splice(db.concerts.indexOf(dbRecord), 1);
  res.json({ message: 'OK' });
});

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not found...' })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))