import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findSearchId(id : number) {
  try {
    const existingSearch = prisma.search.findUnique({
      where: {id},
    });
    return existingSearch;
  } catch (error) {
    console.error(error);
    return false;
  }
};
async function checkSearch(typeName: string) {
  try {
    const exisistingSearch = await prisma.search.findFirst({
      where: {
        type : typeName,
      },
    });
    return exisistingSearch !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findSearchId,
  checkSearch
};