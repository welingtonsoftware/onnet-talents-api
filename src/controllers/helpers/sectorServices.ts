import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findIdSector(id: number) {
  try {
    const existingSectorId = prisma.sector.findUnique({
      where: { id }
    });
    return existingSectorId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  findIdSector
};
