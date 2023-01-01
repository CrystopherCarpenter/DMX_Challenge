import { prisma } from '../config';
import { Prisma } from '@prisma/client';

async function findUser(username: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      username,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findUser,
  create,
};

export default userRepository;
