const mongo = require('mongoose');
const schema = mongo.Schema;
const user = require('./user');

const project = new schema(
    {
        name: {
            type: String,
            required: true
          },
        members: [{
          type: schema.Types.ObjectId,
          ref: user,
          required: true
        }],
        description: {
          type: String,
          required: false
        },
        icon: {
          type: String,
            required: false
        }
    });
    
    module.exports = mongo.model('Project', project);
