const express = require('express');

const UserRouter = require('./user.routes');
const TaskRouter = require('./task.routes')

const router = express.Router();

router.use('/auth', UserRouter);
router.use('/tasks', TaskRouter)

module.exports = router;
