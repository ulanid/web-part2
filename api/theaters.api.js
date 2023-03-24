const { Theaters } = require('../models/theaters')
const { Router } = require('express');

const router = Router();

router.get("/theaters", async (req, res) => {
    const {city, zipcode, latitude, longtitude, theaterId} = req.query;
    
    const queryDb = {};

    if (city) {
        queryDb.name['location.address.city'] = {$regex: city};
    }

    if (zipcode) {
        queryDb.name['location.address.zipcode'] = {$regex: zipcode};
    }

    if (latitude) {
        queryDb.name['location.geo.coordinates.0']=latitude;
    }

    if (longtitude) {
        queryDb.name['location.geo.coordinates.1']=longtitude;
    }

    if (theaterId) {
        queryDb.name = {$exists: theaterId};
    }

    const docs = await Theaters.find(queryDb);

    return res.status(200).send(docs);
});

module.exports = { router };