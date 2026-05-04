import User from '../models/User.js';
import validator from 'validator';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  if (!validator.isEmail(email) || !validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minSymbols: 1 })) {
    return res.status(400).json({ message: 'Invalid email or weak password' });
  }
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already used' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id, user.role), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: generateToken(user._id, user.role), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const profile = async (req, res) => res.json(req.user);
