const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const sessions = require('./api/sessions.api')
const users = require('./api/users.api')
const theaters = require('./api/theaters.api')


console.log(`MONGO_DB_URI:${process.env.MONGO_DB_URI}`)
console.log(`PORT:${process.env.PORT}`)

const Mongo = require('./setup/mongoose')

const app = express();
app.use(bodyParser.json());

const setup = async () => {
    await Mongo.setupDb(process.env.MONGO_DB_URI);

    app.use(sessions.router);

    app.use(theaters.router);

    app.use(users.router);

    /*app.post("/sessions", async (req, res) => {
        const { name, email, text } = req.body;

        const doc = new Sessions({
            name, email, text, date: new Date()
        });

        const elem = await doc.save()

        return res.status(200).send(elem);
    });*/

    app.listen(process.env.PORT, () => {
        console.log("Server was started on 8080 port.")
    });
}

setup();