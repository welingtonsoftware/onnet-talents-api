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
    console.log('services.');
    return existDocument;
  } catch (error) {
    console.error(error)
    return false;
  }

};

async function findDocumentsApllicant(id: any) {
  try {
    const documentExists = prisma.document.findMany({
      where: {applicantId : id},
    });
    return documentExists;
  } catch (error) {
    return false;
  }
};

module.exports ={
  createApplicantDirectory,
  findDocumentId,
  findDocumentsApllicant
};
