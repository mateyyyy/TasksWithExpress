const Task = require('../model/task'); // Asegúrate de que Task sea el modelo, no el esquema

module.exports.createTask = (req, res) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        start: req.body.start,
        story: req.body.story,
        created: req.body.created,
        dueDate: req.body.dueDate,
        done: req.body.done
    });

    task.save()
        .then((task) => {
            res.status(201).json({ 
                status : 'Task successfully created',
                data: task
            });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error al crear la tarea' + err });
        });
};

module.exports.getTasks = (req, res) => {
    Task.find().
    then((response) => {
        return res.status(200).json({
            status : 'success',
            data : response
        })
    })
    .catch((err) => {
        return res.status(400).json({
            status : 'fail',
            data : err
        })
    })
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
        res.status(200).json({
            status : 'success',
            message : 'Task ' + id + 'was deleted'
        });
    });
}

module.exports.getTasksByStory = (req, res) => {
    Task.find({
        story : req.params.id
    })
    .then((stories) => {
        return res.status(200).json({
            status : 'success',
            data : stories
        })
    })
    .catch((err) => {
        return res.status(400).json({
            status : 'fail',
            data : err
        })
    })
}
