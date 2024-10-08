const {createTask, getTasks, getSpecificTask, deleteATask} = require('../controller/taskController');
const express = require('express');
const router = express.Router();

router.post('/',createTask);

router.get('/', getTasks);

router.get('/:id', getSpecificTask);

router.delete('/:id', deleteATask);

module.exports = router;
