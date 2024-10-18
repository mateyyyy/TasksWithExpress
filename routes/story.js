const express = require('express');
const { getStories, deleteStory, createStory, getStory } = require('../controller/story');
const { checkToken } = require('../controller/auth');
const { getTasksByStory } = require('../controller/taskController');
const router = express.Router();

router.get('/', checkToken, getStories);
router.get('/:id', checkToken, getStory);
router.post('/', checkToken, createStory);
router.delete('/:id', checkToken, deleteStory);
router.get('/:id/tasks', checkToken, getTasksByStory);


module.exports = router;