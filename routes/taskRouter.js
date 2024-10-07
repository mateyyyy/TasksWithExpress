const {createTask} = require('../controller/taskController');
const express = require('express');
const router = express.Router();

router.post('/',createTask);

module.exports = router;
