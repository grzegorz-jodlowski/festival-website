const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 8000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))