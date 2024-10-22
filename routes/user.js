const { checkToken } = require('../controller/auth');
const user = require('../controller/user');
const express = require('express')
const router = express.Router()

router.post('/',user.addUser);
router.get('/', checkToken,user.getUsers);
router.get('/:id',checkToken , user.getUser);
router.patch('/:id',checkToken ,user.editUser)

module.exports = router;