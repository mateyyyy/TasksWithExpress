const Task = require('../model/task'); // Asegúrate de que Task sea el modelo, no el esquema

module.exports.createTask = (req, res) => {
    const task = new Task({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status,
        geo: {
            lat: req.body.geo.lat,
            long: req.body.geo.long
        }
    });

    task.save()
        .then(() => {
            res.status(201).json({ message: 'Tarea creada con éxito' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error al crear la tarea' });
        });
};
