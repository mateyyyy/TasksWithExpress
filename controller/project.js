const Project = require('../model/project');
const Epic = require('../model/epic');

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
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({
            status: 'fail',
            message: 'User ID is required',
        });
    }

    Project.find({
        members : userID
    }).
    then((project) => {
        return res.status(200).json({
            status : 'success',
            data : project
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
    Project.findById(req.params.id)
    .then((project) => {
        return res.status(200).json({
            status : 'success',
            data : project,
            este: 'ES ESTE PAPI'
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.deleteProject = async (req, res) => {
    //Verificar que no tenga epicas
    const epic = await Epic.findOne({project : req.params.id})
    if(epic){
        return res.status(400).json({
            status : 'fail',
            message : 'El proyecto contiene una epica...'
        })
    }
    else{
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
    })}

}


module.exports.updateProject = (req, res) => {
    update = {};
    if(req.body.name){
        update.name = req.body.name;
    }
    if(req.body.description){
        update.description = req.body.description;
    }

    Project.findByIdAndUpdate(req.params.id, update)
    .then((updatedProject) => {
        if (!updatedProject) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tarea no encontrado',
            });
        }
        return res.status(200).json({
            status: 'success',
            data: updatedProject,
        });
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: 'Error al actualizar el usuario',
            error: err.message,
        });
    });
}