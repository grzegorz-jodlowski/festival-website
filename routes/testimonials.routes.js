const express = require('express');
const router = express.Router();

const Testimonial = require('../models/testimonial.model');


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

router.post('/testimonials', async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save()
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  try {
    const { author, text } = req.body;

    const updatedElement = {};
    author ? updatedElement.author = author : null;
    text ? updatedElement.text = text : null;

    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: updatedElement })
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

module.exports = router;