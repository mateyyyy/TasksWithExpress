const Story = require('../model/story');
const Task = require('../model/task');

module.exports.createStory = (req, res) => {
    if(req.body==undefined){
        return res.status(400).json({
            status : 'fail',
            message : 'body is missing'
        })
    }
    else if(req.body.name==undefined){
        return res.status(400).json({
            status : 'fail',
            message : 'name is missing'
        })
    }
    else if(req.body.epic==undefined){
        return res.status(400).json({
            status : 'fail',
            message : 'Epic id is missing'
        })
    }

    const story = new Story({        
        name : req.body.name,        
        description : req.body.description,
        epic : req.body.epic,
        owner : req.body.owner,
        assignedTo : req.body.assignedTo,
        points : req.body.points,
        created : req.body.created,
        due : req.body.due,
        started : req.body.started,
        finished : req.body.finished,
        status : req.body.status,
        icon : req.body.icon
    })

    story.save()
    .then((data) => {
        return res.status(200).json({
            status : 'success',
            data : data
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })


}

module.exports.getStories = (req, res) => {
    Story.find({
        owner: req.params.userID
    })
    .then((stories) => {
        return res.status(200).json({
            status : 'success',
            data : stories
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.getStory = (req, res) => {
    Story.findById(req.params.id)
    .then((response) => {
        return res.status(200).json({
            status : 'success',
            data : response
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.deleteStory = async (req, res) => {
    const task = await Task.findOne({story : req.params.id})
    if(task){
        return res.status(400).json({
            status : 'fail',
            message : 'La historia contiene tareas...'
        })
    }
    else{

    Story.findByIdAndDelete(req.params.id)
    .then((data) => {
        return res.status(200).json({
            status : 'success',
            data : data
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            data : err
        })
    })
    }   
}


module.exports.getStoriesByEpic = (req, res) => {
    Story.find({
        epic : req.params.id
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


module.exports.updateStory = (req, res) => {
    update = {};
    if(req.body.name){
        update.name = req.body.name;
    }
    if(req.body.description){
        update.description = req.body.description;
    }

    Story.findByIdAndUpdate(req.params.id, update)
    .then((updatedStory) => {
        if (!updatedStory) {
            return res.status(404).json({
                status: 'fail',
                message: 'Historia no encontrada',
            });
        }
        return res.status(200).json({
            status: 'success',
            data: updatedStory,
        });
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: 'Error al actualizar la historia',
            error: err.message,
        });
    });
}