import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findLocationId(id: number) {
  try {
    const existingLocationId = await prisma.location.findUnique({
      where: { id }
    });

    return !!existingLocationId; // Isso vai retornar true se existir, ou false se não existir
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function chekLocationExists(locationName: string) {
  try {
    const locationExist = await prisma.location.findFirst({
      where: {
        unit : locationName,
      },
    });
    return locationExist !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = {
  findLocationId,
  chekLocationExists
};