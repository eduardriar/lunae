import prisma from './prisma';

export const getActiveServices = () =>
  prisma.service.findMany({
    where: { state: true },
    orderBy: { order: "asc" },
  });
