const express = require('express');
const router = express.Router();

const Seat = require('../models/seat.model');

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find())
  } catch (error) {
    res.json({ message: error })
  }
});

router.get('/seats/random', async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomSeat = await Seat.findOne().skip(rand);
    if (!randomSeat) res.status(404).json({ message: 'Not found' });
    else res.json(randomSeat);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const seatsArray = await Seat.find();

    const isSeatOccupied = seatsArray.some(el => el.day == day && el.seat == seat);

    if (!isSeatOccupied) {
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated', seatsArray);
    } else {
      res.json({ message: 'The slot is already taken...' })
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put('/seats/:id', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const updatedElement = {};
    day ? updatedElement.day = day : null;
    seat ? updatedElement.seat = seat : null;
    client ? updatedElement.client = client : null;
    email ? updatedElement.email = email : null;

    const seatToUpdate = await Seat.findById(req.params.id);
    if (seatToUpdate) {
      await Seat.updateOne({ _id: req.params.id }, { $set: updatedElement })
      res.json(await Seat.findById(req.params.id));
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(seat);
    } else {
      res.status(404).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

module.exports = router;