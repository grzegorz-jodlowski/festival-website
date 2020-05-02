const express = require('express');
const cors = require('cors')

const app = express();
const port = 8000;
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not found...' })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))