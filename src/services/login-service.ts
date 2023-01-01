import { sessionRepository } from '../repositories';
import { userRepository } from '../repositories';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (params: LoginParams) => {
  const { username, password } = params;

  const user = await getUser(username);

  await validatePassword(password, user.password);

  const token = await createSession(user.id);

  return token;
};

const getUser = async (username: string) => {
  const user = await userRepository.findUser(username, { id: true, username: true, password: true });
  if (!user) throw invalidCredentialsError;

  return user;
};

const createSession = async (userId: string) => {
  const token = jwt.sign({ userId }, '890798d0w8qdj7y');
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
};

const validatePassword = async (password: string, userPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError;
};

type LoginParams = Pick<User, 'username' | 'password'>;

const invalidCredentialsError = {
  error: 'InvalidCredentialsError',
  message: 'email or password are incorrect',
};

export const loginService = {
  login,
};
