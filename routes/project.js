const express = require('express');
const router = express.Router();
const { checkToken } = require('../controller/auth');
const { createProject, getProjects, getProjectById, deleteProject, updateProject } = require('../controller/project');
const { getEpicsByProject } = require('../controller/epic');

router.post('/', checkToken, createProject);

router.get('/', checkToken, getProjects);

router.get('/:id', checkToken, getProjectById);

router.delete('/:id', checkToken, deleteProject);

router.get('/:id/epics', checkToken, getEpicsByProject);

router.patch('/:id', checkToken, updateProject);

module.exports = router;