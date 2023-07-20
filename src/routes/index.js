const express = require('express');

const CollabRouter = require('./collaboration.routes');
const ProjectRouter = require('./project.routes');
const TaskRouter = require('./task.routes');
const UserRouter = require('./user.routes');

const router = express.Router();

router.use('/auth', UserRouter);
router.use('/collab', CollabRouter);
router.use('/projects', ProjectRouter);
router.use('/tasks', TaskRouter);

module.exports = router;
