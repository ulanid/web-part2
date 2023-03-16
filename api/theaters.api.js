const { Theaters } = require('../models/theaters')
const { Router } = require('express');

const router = Router();

router.get("/theaters", async (req, res) => {
    const {city, zipcode, latitude, longtitude, theaterId} = req.query;
    const queryDb = {};

    if (city) {
        queryDb.name = {$regex: city};
    }

    if (zipcode) {
        queryDb.name = {$regex: zipcode};
    }

    if (latitude) {
        queryDb.name = {$regex: latitude};
    }

    if (longtitude) {
        queryDb.name = {$regex: longtitude};
    }

    if (theaterId) {
        queryDb.name = {$exists: theaterId};
    }

    const docs = await Theaters.find(queryDb);

    return res.status(200).send(docs);
});

module.exports = { router };