const {Schema, Types, model} = require('mongoose');

const schema = new Schema({
    _id: {type: Types.ObjectId },
    theaterId: {type: String},
    location: {type: Object,
        address: {type: Object,
            street1: {type: String},
            city: {type: String},
            state: {type: String},
            zipcode: {type: String}
        },
        geo: {type: Object, 
            type: {type: String},
            coordinates: {type: Array, 
                latitude: {type: String},
                longtitude: {type: String}
            }
        }
    }
});

const Theaters =  new model('theaters', schema, 'theaters');

module.exports = {Theaters};