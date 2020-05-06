const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not found...' })
});

const server = app.listen(process.env.PORT || 8000, () => console.log('Example app listening at http://localhost:8000'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});