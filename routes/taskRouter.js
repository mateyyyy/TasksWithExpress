const {createTask, getTasks, getTask, deleteTask} = require('../controller/taskController');
const express = require('express');
const router = express.Router();

router.post('/',createTask);

router.get('/',getTasks);

router.get('/:id',getTask);

router.delete('/:id',deleteTask);


module.exports = router;
