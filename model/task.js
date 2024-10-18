const mongo = require('mongoose');
const story = require('./story');
const schema = mongo.Schema;

const task = new schema(
    {
        name: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: false
          },
          story: {
            type: schema.Types.ObjectId,
            ref: story,
            required: true
          },
          created: {
            type: Date,
            default: Date.now,
            required: false
          },
          dueDate: {
            type: Date,
            required: false
          },
          done: {
            type: Boolean,
            required: false,
            default: false
          }
    });
    
    module.exports = mongo.model('Task', task);
