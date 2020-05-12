const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find())
  } catch (error) {
    res.json({ message: error })
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomConcert = await Concert.findOne().skip(rand);
    if (!randomConcert) res.status(404).json({ message: 'Not found' });
    else res.json(randomConcert);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.postConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save()
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.updateConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;

    const updatedElement = {};
    performer ? updatedElement.performer = performer : null;
    genre ? updatedElement.genre = genre : null;
    price ? updatedElement.price = price : null;
    day ? updatedElement.day = day : null;
    image ? updatedElement.image = image : null;

    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: updatedElement })
      res.json(await Concert.findById(req.params.id));
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(concert);
    } else {
      res.status(404).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}