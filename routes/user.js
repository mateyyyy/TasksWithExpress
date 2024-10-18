const user = require('../controller/user');
const express = require('express')
const router = express.Router()

router.post('/',user.addUser);

module.exports = router;