const { checkToken } = require('../controller/auth');
const {createTask, getTasksByUserID, getTask, deleteTask, updateTask} = require('../controller/taskController');
const express = require('express');
const router = express.Router();


router.post('/', checkToken, createTask);

router.get('/:id', checkToken, getTask);

router.delete('/:id', checkToken , deleteTask);

router.patch('/:id', checkToken, updateTask);

module.exports = router;
