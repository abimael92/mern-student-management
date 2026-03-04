import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30m'
  });

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken(user);
  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile
    }
  });
};

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = await User.create({ username, email, password, role, profile });
  res.status(201).json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    profile: user.profile
  });
};

export const logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out' });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

