const {Router} = require ("express");
const router = Router ();
const {User} = require ("../models/users");
const {v4} = require ("uuid");
router.post("/users", async (req, res) => {
    const{email, password}=req.body;
    const user=new User ({email, password, apiKey:v4()});
    const doc = await user.save();
    return res.status(200).send(doc);
})

module.exports = {router};
