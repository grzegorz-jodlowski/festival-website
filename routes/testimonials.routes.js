const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => res.json(db.testimonials));
router.route('/testimonials/random').get((req, res) => res.json(db.testimonials[Math.floor(Math.random() * (db.testimonials.length))]));
router.route('/testimonials/:id').get((req, res) => res.json(db.testimonials.find(el => el.id == req.params.id)));

router.route('/testimonials').post((req, res) => {
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

router.route('/testimonials/:id').put((req, res) => {
  const dbRecord = db.testimonials.find(el => el.id == req.params.id);
  db.testimonials.splice(db.testimonials.indexOf(dbRecord), 1, { ...dbRecord, ...req.body });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const dbRecord = db.testimonials.find(el => el.id == req.params.id);
  db.testimonials.splice(db.testimonials.indexOf(dbRecord), 1);
  res.json({ message: 'OK' });
});

module.exports = router;