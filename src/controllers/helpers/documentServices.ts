import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const createApplicantDirectory = (applicantId : any) => {
  const directoryPath = path.join('uploads', String(applicantId));
  if(!fs.existsSync(directoryPath)){
    fs.mkdirSync(directoryPath);
  }
};

async function findDocumentId(id: any) {
  try {
    const existDocument = await prisma.document.findUnique({
      where: {id}
    });
    return !!existDocument;
  } catch (error) {
    console.error(error)
    return false;
  }

};

module.exports ={
  createApplicantDirectory,
  findDocumentId
};
