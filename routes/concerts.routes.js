const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => res.json(db.concerts));
router.route('/concerts/random').get((req, res) => res.json(db.concerts[Math.floor(Math.random() * (db.concerts.length))]));
router.route('/concerts/:id').get((req, res) => res.json(db.concerts.find(el => el.id == req.params.id)));

router.route('/concerts').post((req, res) => {
  const { performer } = req.body;

  if (performer) {
    db.concerts.push({ ...req.body, id: uuidv4() })
    res.json({ message: 'OK' });
  }
  else {
    res.json({ message: 'You can\'t leave performer field empty!' })
  }
});

router.route('/concerts/:id').put((req, res) => {
  const dbRecord = db.concerts.find(el => el.id == req.params.id)
  db.concerts.splice(db.concerts.indexOf(dbRecord), 1, { ...dbRecord, ...req.body });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const dbRecord = db.concerts.find(el => el.id == req.params.id)
  db.concerts.splice(db.concerts.indexOf(dbRecord), 1);
  res.json({ message: 'OK' });
});

module.exports = router;