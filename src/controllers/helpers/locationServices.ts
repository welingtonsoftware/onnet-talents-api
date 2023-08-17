import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findLocationId(id: number) {
  try {
    const existingLocationId = prisma.location.findUnique({
      where : { id }
    });
    return !!existingLocationId
  } catch (error) {
    console.error(error);
    return false;
  };
};

module.exports = {
  findLocationId
};