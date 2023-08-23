import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient();

async function findStageId(id: number) {
  try {
    const existingStageId = prisma.stage.findUnique({
      where : {id},
    });
    return existingStageId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findStageId
};