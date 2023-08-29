import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findNeighborhoodId(id: any) {
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
async function neighborhoodByCityId(id: number) {
  try {
    const neighborhoodByCityId = await prisma.neighborhood.findMany({
      where: {
        cityId: id,
      },
    });
    return neighborhoodByCityId;
  } catch (error) {
    console.error(error);
    return false;
  }
  
};

module.exports = {
  findNeighborhoodId,
  checkNeighborhoodExists,
  neighborhoodByCityId,
};


