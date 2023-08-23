import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findQuestId(id: number) {
  try {
    const questions = prisma.quest.findUnique({
      where: { id },
    });
    return questions;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findQuestId
};
