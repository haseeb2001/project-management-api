const express = require('express');

const router = express.Router();
const {
  login,
  signup,
  deleteUser,
  fetchAllUsers,
  fetchUser,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/auth/authToken');
const {
  validateUser,
  validateLogin,
} = require('../middlewares/validators/userValidator');

router.get('/all', fetchAllUsers);
router.get('/fetchUser', validateToken, fetchUser);
router.post('/login', validateLogin, login);
router.post('/signup', validateUser, signup);
router.delete('/', validateToken, deleteUser);

module.exports = router;
