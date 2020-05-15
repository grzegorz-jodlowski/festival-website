const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
  try {
    const body = await Workshop.find();
    res.json(body)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Workshop.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomWorkchop = await Workshop.findOne().skip(rand);
    if (!randomWorkchop) res.status(404).json({ message: 'Not found' });
    else res.json(randomWorkchop);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) res.status(404).json({ message: 'Not found' });
    else res.json(workshop);
  } catch (error) {
    res.status(500).json({ message: error })
  }
}