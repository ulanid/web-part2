const { Sessions } = require('../models/sessions')
const { Router } = require('express');

const router = Router();

router.get("/sessions", async (req, res) => {
    const {userId} = req.query;
    const queryDb = {};

    if (userId) {
        queryDb.userId = {$regex: userId};
    }

    const docs = await Sessions.find(queryDb);

    return res.status(200).send(docs);
});

module.exports = { router };