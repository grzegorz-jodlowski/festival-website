const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  name: { type: Number, required: true },
  concertId: { type: Number, required: true },
});

module.exports = mongoose.model('Workshop', workshopSchema);