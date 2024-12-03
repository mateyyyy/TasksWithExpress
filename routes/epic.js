const express = require('express');
const { getEpics, createEpic, getEpic, deleteEpic, updateEpic } = require('../controller/epic');
const { checkToken } = require('../controller/auth');
const { getStoriesByEpic } = require('../controller/story');
const router = express.Router();

router.get('/', checkToken, getEpics);
router.get('/:id', checkToken, getEpic);
router.post('/', checkToken, createEpic); 
router.delete('/:id', checkToken, deleteEpic); 
router.get('/:id/stories', checkToken, getStoriesByEpic);
router.patch('/:id', checkToken, updateEpic);


module.exports = router;
