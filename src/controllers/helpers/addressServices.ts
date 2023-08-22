const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findIdAddress(id: number) {
  try {
    const existingAddressId = await prisma.address.findUnique({
      where: {
        id: id,
      },
    });
    return !!existingAddressId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

async function addressByNeighborhoodId(id: number) {
  try {
    const addressByNeighborhoodId = await prisma.address.findMany({
      where: {
        neighborhoodId : id,
      },
    });
    return addressByNeighborhoodId
  } catch (error) {
    console.error(error);
    return false
  }
};
module.exports = {
  findIdAddress,
  addressByNeighborhoodId,
}
