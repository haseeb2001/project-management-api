const express = require('express');

const router = express.Router();
const {
  getCollabById,
  deleteCollab,
  getMyCollabs,
  createCollab,
} = require('../controllers/collaboration.controller');
const validateToken = require('../middlewares/auth/authToken');

router
  .route('/')
  .get(validateToken, getMyCollabs)
  .post(validateToken, createCollab);
router
  .route('/:id')
  .get(validateToken, getCollabById)
  .delete(validateToken, deleteCollab);

module.exports = router;
