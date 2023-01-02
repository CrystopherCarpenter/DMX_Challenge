import { prisma } from '../config';
import { Prisma } from '@prisma/client';

const findUser = async (username: string, select?: Prisma.UserSelect) => {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      username,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
};

const create = async (data: Prisma.UserUncheckedCreateInput) => {
  return prisma.user.create({
    data,
  });
};

export const userRepository = {
  findUser,
  create,
};
