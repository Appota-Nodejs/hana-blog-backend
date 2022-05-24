import crypto from 'crypto';

import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

import User from '../models/user';
import isValidInput from '../utils/input-validator';

const getUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  if (!isValidInput(userId, 'id')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let user: User | null;
  try {
    user = await User.findByPk(userId);
  } catch (err) {
    const error = new Error('Fetching user failed, please try again later');
    return next(error);
  }

  if (user === null) {
    res.status(200).json({
      message: 'Invalid user',
    });
  } else {
    res.status(200).json({
      user: {
        userId: user.id,
        username: user.username,
        description: user.description,
      },
    });
  }
};

const register: RequestHandler = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error('Invalid inputs passed, please check your data');
    return next(error);
  }

  const {
    username,
    password,
    description,
  }: { username: string; password: string; description: string } = req.body;
  if (
    !isValidInput(username, 'username') ||
    !isValidInput(password, 'password') ||
    !isValidInput(description, 'text')
  ) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let existingUser: User | null;
  try {
    existingUser = await User.findOne({ where: { username: username } });
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  if (!existingUser) {
    const error = new Error('User has already existed');
    return next(error);
  }

  let hashedPassword: string;
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

  let createdUser: User;
  try {
    createdUser = await newUser.save();
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  let token: string;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
      },
      'secret-key',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    description: createdUser.description,
    token: token,
  });
};

const login: RequestHandler = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error('Invalid inputs passed, please check your data');
    return next(error);
  }

  const { username, password }: { username: string; password: string } =
    req.body;
  if (
    !isValidInput(username, 'username') ||
    !isValidInput(password, 'password')
  ) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let existingUser: User | null;
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

  let token: string;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
      },
      'secret-key',
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

const getPublicAddress: RequestHandler = async (req, res, next) => {
  const publicAddress = req.params.publicAddress;
  if (!isValidInput(publicAddress, 'key')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let user: User | null;
  try {
    user = await User.findOne({ where: { publicAddress: publicAddress } });
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  if (user) {
    res.status(200).json({ nonce: user.nonce });
  }

  let hashedPassword: string;
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

  let createdUser: User;
  try {
    createdUser = await newUser.save();
  } catch (err) {
    const error = new Error('Registering failed, please try again later');
    return next(error);
  }

  res.status(200).json({ nonce: createdUser.nonce });
};

const metamaskLogin: RequestHandler = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error('Invalid inputs passed, please check your data');
    return next(error);
  }

  const {
    signature,
    publicAddress,
  }: { signature: string; publicAddress: string } = req.body;
  if (!isValidInput(signature, 'key') || !isValidInput(publicAddress, 'key')) {
    const error = new Error('Invalid inputs, please use valid inputs');
    return next(error);
  }

  let user: User | null;
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

  let savedUser: User;
  try {
    user.nonce = Math.floor(Math.random() * 10000);
    savedUser = await user.save();
  } catch (err) {
    const error = new Error('Logging in failed, please try again later');
    return next(error);
  }

  let token: string;
  try {
    token = jwt.sign(
      {
        userId: savedUser.id,
      },
      'secret-key',
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

export default { getUser, register, login, metamaskLogin, getPublicAddress };
