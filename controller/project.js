const Project = require('../model/project');

module.exports.createProject = (req, res) => {

    if(req.body==undefined){
        return res.status(400).json({
            status : "fail",
            message : "Body is missing"
        })
    }
    else if(req.body.name==undefined){
        return res.status(400).json({
            status : "fail",
            message : "name is missing"
        })
    }
    else if(req.body.members==undefined){
        return res.status(400).json({
            status : "fail",
            message : "members is missing"
        })
    }
    else{
        //termino los controles
        const project = new Project({
            name : req.body.name,
            members : req.body.members,
            description : req.body.description,
            icon : req.body.icon
        })
        project.save()
        .then((suc) => {
            return res.status(200).json({
                status : "success",
                message : suc
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status : "fail",
                message : err
            })
        })
 
    }


    


}

module.exports.getProjects = (req, res) => {
    Project.find().
    then((project) => {
        return res.status(200).json({
            status : 'success',
            projects : project
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.getProjectById = (req, res) => {
    Project.findById(req.params.id).
    then((project) => {
        return res.status(200).json({
            status : 'success',
            projects : project
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.deleteProject = (req, res) => {
    Project.findByIdAndDelete(req.params.id)
    .then((project) => {
        return res.status(200).json({
            status : 'success',
            message : 'Project was deleted',
            projects : project
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}
