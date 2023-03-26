const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const UserAccountController = require('./api/users.api');
const LinksController = require('./api/links.api');
const {Links} = require('./models/links')
const {Users} = require('./models/users');
// require('./models/links');
//require("./models/users")

console.log(`MONGO_DB_URI:${process.env.MONGO_DB_URI}`);
console.log(`PORT:${process.env.PORT}`);

const Mongo = require('./setup/mongoose');
const app = express();
app.use(bodyParser.json());

const setup = async () => {
    await Mongo.setupDb(process.env.MONGO_DB_URI);
    app.use(UserAccountController.router);
    app.use(LinksController.router);

    app.get('/shortLink/:cut', async (req,res) => {
        const cut = req.params.cut;
        const dbQuery={};
        if (cut){
            dbQuery['link.cut']=cut;

        }
        try {
            const doc = await Links.findOne(dbQuery);
            if (!doc) {
                return res.status(400).send({message: 'Short link was not found'});

            }
            if (doc.expiredAt && doc.expiredAt < Date.now()){
                return res.status(400).send({message: 'Link was expired'});

            }
            return res.redirect(doc.link.original);

        }
        catch (err){
            console.error(err);
            return res.status(400).send({message: err.toString()});
        }
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server was started on ${process.env.PORT}`);
    });

}



// const Users = require("./api/users");
// console.log(`MONGO_DB_URI:${process.env.MONGO_DB_URI}`);

// const Mongo = require('./setup/mongoose');

// const app = express();
// app.use(bodyParser.json());

// const setup = async () => {
//  await Mongo.setupDb(process.env.MONGO_DB_URI);
//  app.use(Users.router);
//  app.listen(process.env.PORT, () => {
//   console.log(`Server was started on ${process.env.PORT}`);
//  });
// };

setup();