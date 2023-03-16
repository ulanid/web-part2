const { Users } = require('../models/users')
const { Router } = require('express');

const router = Router();

router.get("/users", async (req, res) => {
    const {name, email} = req.query;
    const queryDb = {};

    if (name) {
        queryDb.name = {$regex: name};
    }

    if (email) {
        queryDb.name = {$regex: email};
    }

    const docs = await Users.find(queryDb);

    return res.status(200).send(docs);
});

module.exports = { router };