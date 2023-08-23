import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function findInterviewId(id: number) {
  try {
    const exisistingInterviewId = await prisma.interview.findUnique({
      where : {id},
    });
    return exisistingInterviewId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findInterviewId
}