const User = require("../model/user")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports.addUser = (req, res) => {
    if(req.body!=null && req.body!=undefined){
        if(req.body.username==null){
            res.status(400).json({
                status: "fail",
                message: { body: "Username is required!" }
              })
        }
       
        else{ //Si llega aca esta todo bien.
            const user = new User({
                username: req.body.username,
                password: hashSync(req.body.password, genSaltSync(10)),
                email: req.body.email,
                name:{
                    first: req.body.name.first,
                    last: req.body.name.last,
                }
            })

            user.save()
            .then((user) => {
                res.status(200).json({
                status: "success",
                message:  user })
            })
            .catch((err) => {
                res.status(500).json({
                    status : "fail",
                    message: err,
                })
            })

        }

    }
    else{
        res.status(400).json({
            status: "fail",
            message: { body: "Body is required!" }
          })
    }
}


module.exports.getUsers = (req, res) => {
    User.find()
    .then((users) => {
        return res.status(200).json({
            status : 'success',
            data : users
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}


module.exports.getUser = (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        return res.status(200).json({
            status : 'success',
            data : user
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status : 'fail',
            message : err
        })
    })
}

module.exports.editUser = (req, res) => {
    const userId = req.params.id;
    const updates = {};
    if (req.body.username) {
        updates.username = req.body.username;
    }
    if (req.body.password) {
        updates.password = hashSync(req.body.password, genSaltSync(10));
    }
    if (req.body.email) {
        updates.email = req.body.email;
    }
    if (req.body.name) {
        if (req.body.name.first) {
            updates['name.first'] = req.body.name.first;
        }
        if (req.body.name.last) {
            updates['name.last'] = req.body.name.last;
        }
    }

    User.findByIdAndUpdate(userId, updates)
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Usuario no encontrado',
                });
            }
            return res.status(200).json({
                status: 'success',
                data: updatedUser,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: 'fail',
                message: 'Error al actualizar el usuario',
                error: err.message,
            });
        });
};

