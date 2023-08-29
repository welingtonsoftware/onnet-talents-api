import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findFunctionId(id: number) {
  try {
    const existingFunctionId = await prisma.function.findUnique({
      where: {id}
    });
    return !!existingFunctionId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

async function chekFunctionExists( functionName: string) {
  try {
    const existingFunctionName = await prisma.function.findFirst({
      where: {
        function : functionName,
      },
    });
    return existingFunctionName !== null;
  } catch (error) {
    console.error(error)
    return false;
  }
};

module.exports = {
  findFunctionId,
  chekFunctionExists
};