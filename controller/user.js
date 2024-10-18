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