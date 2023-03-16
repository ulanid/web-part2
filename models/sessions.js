const {Schema, Types, model} = require('mongoose');

const schema = new Schema({
    _id: {type: Types.ObjectId },
    user_id: {type: String},
    jwt: {type: String}
});

const Sessions =  new model('sessions', schema, 'sessions');

module.exports = {Sessions};