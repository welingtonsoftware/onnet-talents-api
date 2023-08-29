const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findAddressId(id: number) {
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
    const addresses = await prisma.address.findMany({
      where: {
        neighborhoodId : id,
      },
    });
    if (addresses.length === 0){
      return `Não existe logradouro cadastrado para bairro com Id: ${ id }`;
    }
    return addresses;
  } catch (error) {
    console.error(error);
    return false;
  }
};
module.exports = {
  findAddressId,
  addressByNeighborhoodId,
}
