const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const getUser = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findByPk(userId);
  } catch (err) {
    const error = new Error('Fetching user failed, please try again later');
    return next(error);
  }

  res.status(200).json({
    user: {
      userId: user.dataValues.id,
      username: user.dataValues.username,
      description: user.dataValues.description,
    },
  });
};

const register = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error('Invalid inputs passed, please check your data');
    return next(error);
  }

  const { username, password, description } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ where: { username: username } });
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  if (existingUser) {
    const error = new Error('User has already existed');
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new Error('Could not create user, please try again later');
    return next(error);
  }

  const newUser = new User({
    username,
    password: hashedPassword,
    description,
  });

  let createdUser;
  try {
    createdUser = await newUser.save();
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.dataValues.id,
        username: createdUser.dataValues.username,
        description: createdUser.dataValues.description,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.dataValues.id,
    username: createdUser.dataValues.username,
    description: createdUser.dataValues.description,
    token: token,
  });
};

const login = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error('Invalid inputs passed, please check your data');
    return next(error);
  }

  const { username, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ where: { username: username } });
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  if (!existingUser) {
    const error = new Error('Invalid credentials, could not log you in');
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new Error(
      'Could not log you in, please check your credentials and try again'
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new Error('Invalid credentials, could not log you in');
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        username: existingUser.username,
        description: existingUser.description,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  res.status(200).json({
    userId: existingUser.id,
    username: existingUser.username,
    description: existingUser.description,
    token: token,
  });
};

module.exports = { getUser, register, login };
