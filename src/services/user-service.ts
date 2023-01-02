import { userRepository } from '../repositories';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

const createUser = async ({ username, password }: CreateUserParams) => {
  await validateUniqueUsername(username);

  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.create({
    username,
    password: hashedPassword,
  });
  return httpStatus.CREATED;
};

const validateUniqueUsername = async (username: string) => {
  const usernameConflict = await userRepository.findUser(username);
  if (usernameConflict) {
    throw httpStatus.CONFLICT;
  }
};

type CreateUserParams = Pick<User, 'username' | 'password'>;

export const userService = {
  createUser,
};
