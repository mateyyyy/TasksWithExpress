const mongo = require('mongoose');
const Task = mongo.Schema;

const task = new Task(
    {
        id: {
            type: String,  // Si usas 'wid' o similar, ajústalo
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,  // Puede estar vacío
            default: ""
        },
        start: {
            type: Date,
            required: true,
            default: Date.now
        },
        end: {
            type: Date,
            required: false
        },
        status: {
            type: String,
            enum: ['pending', 'in progress', 'done'], // Valores permitidos
            required: true
        },
        geo: {
            lat: {
                type: Number,
                required: false  // No siempre es obligatorio
            },
            long: {
                type: Number,
                required: false  // No siempre es obligatorio
            }
        }
    });
    
    // Crear y exportar el modelo
    module.exports = mongo.model('Task', task);
