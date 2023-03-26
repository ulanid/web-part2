const {Router} = require('express');
const router = Router();
const {Links} = require('../models/links');
const {Users} = require('../models/users')

router.use("/links", async (req, res, next) => {
    const {authorization} = req.headers;
      if (!authorization) {
       return res.status(401).send({ message: `ApiKey is required`});

      }
      const user = await Users.findOne({ apiKey: authorization });
      if (!user) {
       return res.status(401).send({ message: `User is not authorized` });
      }
      return next();
   });

function makeCut(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;


    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;

}

router.post("/links", async (req, res) => {
    const { original } = req.body;
    const { authorization } = req.headers;

    async function linkMaker() {
      const randomLink = makeCut(6);
     const linkCheck = await Links.findOne({ cut: randomLink });
     if(linkCheck) {
      return linkMaker()
     }
     else {
      return randomLink;
     }
    }
   
    try {
       if (!original) {
           return res.status(400).send({ message: '400, Original link is required' });
       }
     linkMaker();

     const expires = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
   
     const newLink = new Links({ link: { original, cut: randomLink }, expiredAt: expires, userId: authorization });
     const doc = await newLink.save();
   
     return res.status(200).send({ link: doc.link.cut, expiredAt: doc.expiredAt });
    } catch (err) {
     console.error(err);
     res.status(400).send({ message: err.toString() });
    }
   });

  router.get("/links?expiredAt", async (req, res) => {
    const { authorization } = req.headers;

  })

module.exports = {router}
   