import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findAnswerId(id: number) {
  try {
    const existingAnswer = prisma.answer.findUnique({
      where : { id },
    });

    return !!existingAnswer;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findAnswerId
};