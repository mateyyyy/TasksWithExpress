const Story = require('../model/story');

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
            message : data
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
    Story.find()
    .then((stories) => {
        return res.status(200).json({
            status : 'success',
            epic : stories
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
            message : response
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.deleteStory = (req, res) => {
    Story.findByIdAndDelete(req.params.id)
    .then((data) => {
        return res.status(200).json({
            status : 'Story successfully removed',
            message : data
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}


module.exports.getStoriesByEpic = (req, res) => {
    Story.find({
        epic : req.params.id
    })
    .then((stories) => {
        return res.status(200).json({
            status : 'success',
            message : stories
        })
    })
    .catch((err) => {
        return res.status(400).json({
            status : 'fail',
            message : err
        })
    })

}