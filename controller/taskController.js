const Task = require('../model/task'); // Asegúrate de que Task sea el modelo, no el esquema

module.exports.createTask = (req, res) => {
    const task = new Task({
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
            res.status(500).json({ error: 'Error al crear la tarea' + err });
        });
};



module.exports.getTasks = (req, res) => {
    Task.find().
    then((response) => res.json(response));
}


module.exports.getTask = (req, res) => {
    const id = req.params.id;
    Task.findById(id).
    then((response) => {
        if(response){
            res.json(response)
        }
        else{
            res.status(404).json("Tarea no encontrada")
        }
    })
}
    


module.exports.deleteTask = (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
    .then((response) => {
        if (!response) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.send('Tarea eliminada');
    });
}

