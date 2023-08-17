const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function validadeApplicantID(id: number) {
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
  validadeApplicantID,
};