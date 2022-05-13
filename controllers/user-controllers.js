const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  let user;

  try {
    user = await User.findByPk(userId);
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ user: user });
};

const register = async (req, res, next) => {
  const { username, password, description } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ where: { username: username } });
  } catch (err) {
    return next(err);
  }

  if (existingUser) {
    const err = new Error('User has already existed!');
    return next(err);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(err);
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
    return next(err);
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
    return next(err);
  }

  res.status(201).json({
    userId: createdUser.dataValues.id,
    username: createdUser.dataValues.username,
    description: createdUser.dataValues.description,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ where: { username: username } });
  } catch (err) {
    return next(err);
  }

  if (!existingUser) {
    const err = new Error('Invalid credentials, could not log you in');
    return next(err);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(err);
  }

  if (!isValidPassword) {
    const err = new Error('Invalid credentials, could not log you in');
    return next(err);
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
    return next(err);
  }

  res.status(200).json({
    userId: existingUser.id,
    username: existingUser.username,
    description: existingUser.description,
    token: token,
  });
};

module.exports = { getUser, register, login };
