const { body } = require('express-validator');
const { validationResponse } = require('./validatorResponse');

const validateLogin = [
  body('username').custom((value, { req }) => {
    if (req.body.email) {
      return true;
    }
    if (!value) {
      throw new Error('Username is required');
    }
    return true;
  }),
  body('email').custom((value, { req }) => {
    if (req.body.username) {
      return true;
    }
    if (!value) {
      throw new Error('Email is required');
    }
    if (!value.match(/\S+@\S+\.\S+/)) {
      throw new Error('Invalid email');
    }

    return true;
  }),
  body('password').notEmpty().withMessage('Password is required'),
  validationResponse,
];

const validateUser = [
  validateLogin,
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validationResponse,
];

module.exports = {
  validateLogin,
  validateUser,
};
