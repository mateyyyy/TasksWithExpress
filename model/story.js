const mongo = require('mongoose');
const schema = mongo.Schema;
const epic = require('./epic');
const user = require('./user');

const story = new schema(
    {
        name: {
            type: String,
          required: true
        },
        description: {
          type: String,
          required: false
        },
        epic: {
          type: schema.Types.ObjectId,
          ref: epic,
          required: true
        },
        owner: {
          type: schema.Types.ObjectId,
          ref: user,
          required: false
        },
        assignedTo: [{
          type: schema.Types.ObjectId,
          ref: user,
          required: false
        }],
        points: {
          type: Number,
          required: false,
          default: 0,
          min: 0,
          max: 5,
        },
        created: {
          type: Date,
          default: Date.now,
          required: false
        },
        due: {
          type: Date,
          required: false
        },
        started: {
          type: Date,
          required: false
        },
        finished: {
          type: Date,
          required: false
        },
        status: {
          type: String,
          enum: ['todo', 'running', 'done'],
          required: false,
          default: 'todo'
        },
        icon: {
          type: String,
          required: false
        }
    });
    
    // Crear y exportar el modelo
    module.exports = mongo.model('Story', story);
