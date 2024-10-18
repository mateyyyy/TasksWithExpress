const mongo = require('mongoose');
const User = mongo.Schema;


const user = new User(
    {
        username : {
            type: String,
            required: true,
        },

        password : {
            type: String,
            required: true,
        },

        email : {
            type: String,
            required: true,
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
