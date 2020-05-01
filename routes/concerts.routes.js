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
