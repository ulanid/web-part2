const {Schema, Types, model} = require('mongoose');

const schema = new Schema({
    name: {type: String},
    email: {type: String},
    movie_id: {type: Types.ObjectId},
    text: {type: String},
    date: {type: Date}
});

const Comments =  new model('comments', schema, 'comments');

module.exports = {Comments};
