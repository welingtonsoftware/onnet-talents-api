import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findSearchQuestId(id: number) {
  try {
    const searchQuestionExists = await prisma.search_quest.findUnique({
      where: { id },
    });
    return !!searchQuestionExists;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findSearchQuestId
}