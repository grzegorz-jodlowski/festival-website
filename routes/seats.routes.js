app.get('/seats', (req, res) => res.json(db.seats));
app.get('/seats/random', (req, res) => res.json(db.seats[Math.floor(Math.random() * (db.seats.length))]));
app.get('/seats/:id', (req, res) => res.json(db.seats.find(el => el.id == req.params.id)));

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;

  if (day && seat && client && email) {
    db.seats.push({ id: uuidv4(), ...req.body })
    res.json({ message: 'OK' });
  }
  else {
    res.json({ message: 'You can\'t leave fields empty!' })
  }
});

app.put('/seats/:id', (req, res) => {
  const dbRecord = db.seats.find(el => el.id == req.params.id)
  db.seats.splice(db.seats.indexOf(dbRecord), 1, { ...dbRecord, ...req.body });
  res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
  const dbRecord = db.seats.find(el => el.id == req.params.id)
  db.seats.splice(db.seats.indexOf(dbRecord), 1);
  res.json({ message: 'OK' });
});
