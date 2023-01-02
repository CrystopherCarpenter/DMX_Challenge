import { sessionRepository } from '../repositories';
import { userRepository } from '../repositories';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { jwtConfig } from '../config';

const login = async (params: LoginParams) => {
  const { username, password } = params;

  const user = await getUser(username);

  await validatePassword(password, user.password);

  const token = await createSession(user.id);

  return token;
};

const getUser = async (username: string) => {
  const user = await userRepository.findUser(username, { id: true, username: true, password: true });
  if (!user) throw httpStatus.UNAUTHORIZED;

  return user;
};

const createSession = async (userId: string) => {
  const token = jwt.sign({ userId }, jwtConfig.secret as string);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
};

const validatePassword = async (password: string, userPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw httpStatus.UNAUTHORIZED;
};

type LoginParams = Pick<User, 'username' | 'password'>;

export const loginService = {
  login,
};
