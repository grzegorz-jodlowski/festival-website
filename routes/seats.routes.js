const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => res.json(db.seats));
router.route('/seats/random').get((req, res) => res.json(db.seats[Math.floor(Math.random() * (db.seats.length))]));
router.route('/seats/:id').get((req, res) => res.json(db.seats.find(el => el.id == req.params.id)));

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const isSeatOccupied = db.seats.some(el => el.day == day && el.seat == seat);

  if (!isSeatOccupied) {
    if (day && seat && client && email) {
      db.seats.push({ id: uuidv4(), ...req.body })
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated', db.seats);
    }
    else {
      res.json({ message: 'You can\'t leave fields empty!' })
    }
  } else {
    res.json({ message: 'The slot is already taken...' })
  }
});

router.route('/seats/:id').put((req, res) => {
  const dbRecord = db.seats.find(el => el.id == req.params.id)
  db.seats.splice(db.seats.indexOf(dbRecord), 1, { ...dbRecord, ...req.body });
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const dbRecord = db.seats.find(el => el.id == req.params.id)
  db.seats.splice(db.seats.indexOf(dbRecord), 1);
  res.json({ message: 'OK' });
});

module.exports = router;