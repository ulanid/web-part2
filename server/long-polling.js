const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');

const PORT = 8080;
const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/messages', (req, res) => {
 emitter.once('new-message', (message) => {
  res.status(200).send({ message });
 });
});

app.post('/messages', (req, res) => {
 const message = req.body;
 console.log('message:', message);
 emitter.emit('new-message', message);
 return res.status(200).send();
});

app.listen(PORT, () => console.log(`Server was started on ${PORT}`));