const mongo = require('mongoose');
const schema = mongo.Schema;
const project = require('./project');

const epic = new schema(
    {
        project: {
            type: schema.Types.ObjectId,
            ref: project,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: false
          },
          icon: {
            type: String,
            required: false
          }
    });
    
    module.exports = mongo.model('Epic', epic);
