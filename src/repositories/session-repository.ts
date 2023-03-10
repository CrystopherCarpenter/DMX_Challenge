import { prisma } from '../database';
import { Prisma } from '@prisma/client';

const create = async (data: Prisma.SessionUncheckedCreateInput) => {
  return prisma.session.create({
    data,
  });
};

export const sessionRepository = {
  create,
};
