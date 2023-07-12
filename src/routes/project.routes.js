const express = require('express');
const { getProjectCollabs } = require('../controllers/collaboration.controller');

const router = express.Router();
const {
  getAllProjects,
  getMyProjects,
  createProject,
  updateProject,
  getProjectById,
  deleteProject,
} = require('../controllers/project.controller');
const validateToken = require('../middlewares/auth/authToken');

router.get('/all', validateToken, getAllProjects);
router
  .route('/')
  .post([validateToken], createProject)
  .get(validateToken, getMyProjects);
router
  .route('/:id')
  .post([validateToken], updateProject)
  .get(validateToken, getProjectById)
  .delete(validateToken, deleteProject);
router.get('/:id/collabs', validateToken, getProjectCollabs);

module.exports = router;
