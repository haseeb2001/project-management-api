const express = require('express');

const router = express.Router();
const {
  getAllTask,
  getMyTasks,
  getProjectTasks,
  createTask,
  updateTask,
  getTaskById,
  deleteTask,
} = require('../controllers/task.controller');
const validateToken = require('../middlewares/auth/authToken');

router.get('/all', validateToken, getAllTask);
router.get('/project/:projectId', validateToken, getProjectTasks);
router
  .route('/')
  .post([validateToken], createTask)
  .get(validateToken, getMyTasks);
router
  .route('/:id')
  .post([validateToken], updateTask)
  .get(validateToken, getTaskById)
  .delete(validateToken, deleteTask);

module.exports = router;
