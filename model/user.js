const mongo = require('mongoose');
const schema = mongo.Schema;


const user = new schema(
    {
        username : {
            type: String,
            required: true,
            unique: true
        },

        password : {
            type: String,
            required: true,
        },

        email : {
            type: String,
            required: true,
            unique: true
        },

        name : {
            first : {
                type: String,
                required: false,
            },
            last : {
                type: String,
                required: false,
            }
        }
    });
    
module.exports = mongo.model('User', user);
