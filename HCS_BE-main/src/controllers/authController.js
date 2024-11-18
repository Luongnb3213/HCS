import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/token.js';
import UserModel from '../models/userModel.js';
import { Role, Gender } from '@prisma/client';

export const Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(404).json({ message: 'No user found' });
    return;
  }

  const user = await UserModel.findByUsernameAndPassword(username, password);

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken });
    return;
  }
  res.status(404).json({ message: 'No user found' });
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken(user);
    res.json({ token: newAccessToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

export const Signup = async (req, res) => {
  const { username, password, email, fullname } = req.body;
  try {
    const userCreate = await UserModel.create({
      username: username,
      password: password,
      email: email,
      fullName: fullname,
      role: "USER",
      gender: Gender.MALE
    });


    if (userCreate) {
      res.status(200).json({ message: 'Signup successful ', userCreate });
      return;
    }

    res.status(400).json({ message: 'Something went wrong ' });
  } catch (error) {
    res.json(error);
  }
};
