<p align="center">
<a href="https://festival-website.herokuapp.com/"><img src="./logo.jpeg" title="Festival website" alt="snippet of festival website panel to book seats"></a>
</p>



# <p align="center">🎷 Festival website project</p>
<p align="center">Project for learning Express.js</p>

</br>

## Table of Contents

- [<p align="center">🎷 Festival website project</p>](#-festival-website-project)
  - [Table of Contents](#table-of-contents)
  - [<a name="about"></a>What's this project about?](#whats-this-project-about)
  - [<a name="technologies"></a>Technologies used](#technologies-used)
  - [<a name="what"></a>What I learned?](#what-i-learned)
  - [<a name="interesting"></a>Interesting code snippet (for me of course 😉)](#interesting-code-snippet-for-me-of-course-)
  - [<a name="install"></a>Installation and quick start](#installation-and-quick-start)
  - [<a name="site"></a>Website (on Heroku)](#website-on-heroku)

</br>

## <a name="about"></a>What's this project about?

This is a project of website for music festival. It allows to review concerts and their prices. An important element is the ticket booking subpage. You can book a ticket and block its availability in real time by using the WebSocket technology.

</br>

## <a name="technologies"></a>Technologies used
- HTML
- CSS
- SCSS
- Bootstrap/Reactstrap
- JavaScript
- React
- React Router
- Redux
- Axios
- Thunk
- Express
- Socket.io (WebSocket)
- MongoDB
- MongoDB Atlas
- Mongoose
- Mocha/Chai
- GIT

</br>

## <a name="what"></a>What I learned?

- what main frameworks are available for node.js ([Express.js](https://expressjs.com/), [Koa.js](https://koajs.com/), [Feathers.js](https://feathersjs.com/)),
- types of servers and technologies used on the backend,
- build simple servers using Express.js,
- use Express.js middleware (eg. `express.static`),
- work with the built-in `path` Node.js module (`const path = require('path');`),
- use [Nodemon](https://nodemon.io/) to automatically refresh changes,
- use Handlebars engine templates on the backend to render HTML,
- test HTTP requests using [Postman](https://www.postman.com/),
- what is the difference between `x-www-form-url-encoded` and `multipart/form-data`  data transfer methods,
- validate received data on server side,
- use the REST standard to build the API server (REST – Respresentation State Transfer),
- restrict connections to the API using cors functionality,
- extract endpoint groups to separate files (`express.Router`),
- test code on the backend using Mocha/Chai libraries,
- synchronize development servers and prepare the server for publishing the website.




</br>

## <a name="interesting"></a>Interesting code snippet (for me of course 😉)
- express server setup:

```js
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
app.use((req, res, next) => {
  req.io = io;
  next();
});
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
```

</br>

## <a name="install"></a>Installation and quick start

- use the package manager [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/) to install dependencies:

```bash
npm install // yarn install

or

npm i // yarn
```
- run server with nodemon (after nodemon installation):

```bash
npm start

or

yarn start
```
- run watch mode to constantly refreshing react client:

```bash
cd client/

then:

npm start

or

yarn start
```

<br/>


## <a name="site"></a>Website (on Heroku)
[Festival website](https://festival-website.herokuapp.com/)
- if the page loads slowly, wait a moment, the server is waking up because it is hosted on a free platform Heroku.

</br>
</br>

  *project implemented as part of the 9-month [Web Developer Plus](https://kodilla.com/pl/bootcamp/webdeveloper/?type=wdp&editionId=309) course organized by [Kodilla](https://drive.google.com/file/d/1AZGDMtjhsHbrtXhRSIlRKKc3RCxQk6YY/view?usp=sharing)


