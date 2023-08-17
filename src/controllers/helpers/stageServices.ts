import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient();

async function findIdStage(id: number) {
  try {
    const existingStageId = prisma.stage.findUnique({
      where : {id},
    });
    return existingStageId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  findIdStage
};