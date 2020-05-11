const express = require('express');
const { v4: uuidv4 } = require('uuid');

const Testimonial = require('../models/testimonial.model');

const router = express.Router();

router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find())
  } catch (error) {
    res.json({ message: error })
  }
});

router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomTestimonial = await Testimonial.findOne().skip(rand);
    if (!randomTestimonial) res.status(404).json({ message: 'Not found' });
    else res.json(randomTestimonial);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error })
  }
});


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