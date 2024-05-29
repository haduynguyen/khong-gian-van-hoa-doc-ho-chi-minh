import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const getCurrentUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(StatusCodes.OK).json({ user: null });
  }

  const { userId, role } = verifyJWT(token);

  const user = await User.findOne({ _id: userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
