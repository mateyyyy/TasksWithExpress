const User = require("../model/user");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
var jwt = require('jsonwebtoken');


//Verifica credenciales
module.exports.checkToken = (req, res, next) =>{
    const token = req.get("auth");
    jwt.verify(token, 'privateKEY', (err, message) => {
        if(err) {
            res.status(400).json({
                status : "fail",
                message , err
            })
        }
        else{
            next();
        }
    })
}


//Verifica credenciales y genera el token
module.exports.login = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    if(username!=null){
        User.findOne({
            username : username
        })
        .then((user) => {
            if(user){
               
                const result = compareSync(password, user.password);
                if(result){
                    user.password = undefined;
                    const token = jwt.sign({ user: user }, "privateKEY", {
                    expiresIn: "24h"
                    });
                    return res.status(200).json({
                        status: "success",
                        data: {
                            user: user,
                            token: token,
                            message: "Authorized"
                        }
                    })
                }
                else
                {
                    return res.status(200).json({
                        status: "fail",
                        message: "Unauthorized"
                    })
                }
                
            }
        } )

    }


}