const { checkToken } = require('../controller/auth');
const {createTask, getTasks, getTask, deleteTask} = require('../controller/taskController');
const express = require('express');
const router = express.Router();


router.post('/', checkToken, createTask);

router.get('/', checkToken, getTasks);

router.get('/:id', checkToken, getTask);

router.delete('/:id', checkToken , deleteTask);


module.exports = router;
