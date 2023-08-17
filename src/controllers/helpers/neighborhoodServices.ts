import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findIdNeighborhood(id: any) {
  try {
    const existingNeighborhoodId = await prisma.neighborhood.findUnique({
      where:{ id },
    });
    return !!existingNeighborhoodId;
  } catch (error) {
    console.error(error);
    return false;
  }
};
async function checkNeighborhoodExists(neighborhoodName: string, cityId: number) {
  try {
    const exisistingNeighborhood = await prisma.neighborhood.findFirst({
      where:{
        neighborhood_name: neighborhoodName,
        cityId: cityId
      },
    });
    return exisistingNeighborhood !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findIdNeighborhood,
  checkNeighborhoodExists
};


