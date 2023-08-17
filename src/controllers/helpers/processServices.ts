import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findIdProcess(id: number) {
  try {
    const exisistingProcess = await prisma.process.findUnique({
      where: {id},
    });
    return exisistingProcess;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findIdProcess
};