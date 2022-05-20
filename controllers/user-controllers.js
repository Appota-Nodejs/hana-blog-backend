const crypto = require('crypto');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { recoverPersonalSignature, personalSign } = require('eth-sig-util');
const { bufferToHex } = require('ethereumjs-util');

const User = require('../models/user');
const isValidInput = require('../utils/input-validator');

const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  if (!isValidInput(userId, 'id')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let user;
  try {
    user = await User.findByPk(userId);
  } catch (err) {
    const error = new Error('Fetching user failed, please try again later');
    return next(error);
  }

  if (!user) {
    res.status(200).json({
      message: 'Invalid user',
    });
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
  if (
    !isValidInput(username, 'username') ||
    !isValidInput(password, 'password') ||
    !isValidInput(description, 'text')
  ) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

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
  if (
    !isValidInput(username, 'username') ||
    !isValidInput(password, 'password')
  ) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

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

const getPublicAddress = async (req, res, next) => {
  const publicAddress = req.params.publicAddress;
  if (!isValidInput(publicAddress, 'key')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let user;
  try {
    user = await User.findOne({ where: { publicAddress: publicAddress } });
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  if (user) {
    res.status(200).json({ nonce: user.nonce });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(
      crypto.randomBytes(18).toString('hex'),
      12
    );
  } catch (err) {
    const error = new Error('Could not create user, please try again later');
    return next(error);
  }

  const newUser = new User({
    username: publicAddress,
    password: hashedPassword,
    description: 'something about yourself',
    publicAddress: publicAddress,
  });

  let createdUser;
  try {
    createdUser = await newUser.save();
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  res.status(200).json({ nonce: createdUser.nonce });
};

const metamaskLogin = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error('Invalid inputs passed, please check your data');
    return next(error);
  }

  const { signature, publicAddress } = req.body;
  if (!isValidInput(signature, 'key') || !isValidInput(publicAddress, 'key')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let user;
  try {
    user = await User.findOne({ where: { publicAddress: publicAddress } });
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  if (!user) {
    const error = new Error('User not found');
    return next(error);
  }

  const msg = `I am signing my one-time nonce: ${user.nonce}`;
  const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
  const address = recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature,
  });

  if (address !== publicAddress) {
    const error = new Error('Signature verification failed');
    return next(error);
  }

  let savedUser;
  try {
    user.nonce = Math.floor(Math.random() * 10000);
    savedUser = await user.save();
  } catch (err) {
    const error = new Error('Signature verification failed');
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: savedUser.id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  res.status(200).json({
    userId: savedUser.id,
    publicAddress: savedUser.publicAddress,
    username: savedUser.username,
    description: savedUser.description,
    token: token,
  });
};

module.exports = { getUser, register, login, metamaskLogin, getPublicAddress };
