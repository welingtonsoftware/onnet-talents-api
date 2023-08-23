const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findApplicantId(id: number) {
  try {
    const existingApplicant = await prisma.applicant.findUnique({
      where: {id}
    });
    return !!existingApplicant;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports ={
  findApplicantId,
};