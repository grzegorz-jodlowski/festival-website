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
    const randomWorkshop = await Workshop.findOne().skip(rand);
    if (!randomWorkshop) res.status(404).json({ message: 'Not found' });
    else res.json(randomWorkshop);
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

exports.postWorkshop = async (req, res) => {
  try {
    const { name, concertId } = req.body;
    const newWorkshop = new Workshop({ name, concertId });
    await newWorkshop.save()
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

