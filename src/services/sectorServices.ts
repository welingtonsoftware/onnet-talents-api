import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findSectorId(id: number) {
  try {
    const existingSectorId = prisma.sector.findUnique({
      where: { id }
    });
    return existingSectorId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findSectorId
};
