const Epic = require('../model/epic');

module.exports.createEpic = (req, res) => {
    if(req.body==undefined){
        return res.status(400).json({
            status : 'fail',
            message : 'body is missing'
        })
    }
    else if(req.body.project==undefined){
        return res.status(400).json({
            status : 'fail',
            message : 'Project id is missing'
        })
    }
    else if(req.body.name==undefined){
        return res.status(400).json({
            status : 'fail',
            message : 'Name is missing'
        })
    }

    const epic = new Epic({
        project : req.body.project,
        name : req.body.name,
        description : req.body.description,
        icon : req.body.icon
    })

    epic.save()
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

module.exports.getEpics = (req, res) => {
    Epic.find()
    .then((epic) => {
        return res.status(200).json({
            status : 'success',
            data : epic
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.getEpic = (req, res) => {
    Epic.findById(req.params.id)
    .then((response) => {
        return res.status(200).json({
            status : 'success',
            data : response
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            data : err
        })
    })
}

module.exports.deleteEpic = (req, res) => {
    Epic.findByIdAndDelete(req.params.id)
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

module.exports.getEpicsByProject = (req, res) => {
    Epic.find({
        project : req.params.id
    })
    .then((epics) => {
        return res.status(200).json({
            status : 'success',
            data : epics
        })
    })
    .catch((err) => {
        return res.status(400).json({
            status : 'fail',
            data : err
        })
    })

}
