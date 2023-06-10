const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const setTelegramWebhook = require('./telegram_bot');
const setupWebSocket = require('./websocket');
const { users } = require('./websocket');

const app = express();
setupWebSocket();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(bodyParser.json());
setTelegramWebhook(app, emitter);

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/login', (req, res) => {
 const { id } = req.query;
 if (!id) {
  return res.status(400).send({
   message: 'parameter id is required'
  });
 }
 const eventName = `login-${id}`;
 console.log(`Wait on login id:${id}`);
 emitter.once(eventName, (userInfo) => {
  res.status(200).send(userInfo);
 });
});

app.get('/users', (req, res) => {
    const { status } = req.query;

    if (status) {
        if (status === 'online') {
            const filtered = Object.keys(users).filter(key => users[key] === true);
            return res.status(200).send(filtered);
        }
        if (status === 'offline') {
            const filtered = Object.keys(users).filter(key => users[key] === false);
            return res.status(200).send(filtered);
        }
        return res.status(400).send({ message: 'Query parameter is incorrect!' });
    }

    return res.status(200).send(users);
});

app.listen(
 process.env.PORT,
 () => console.log(`Server was started on ${process.env.PORT}`)
);