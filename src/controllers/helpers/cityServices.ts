import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findIdCity(id: number) {
  try {
    const exisistingCityId = await prisma.city.findUnique({
      where: {
        id : id,
      },
    });
    return !!exisistingCityId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

async function chekCityExists(cityName: string, uf: string) {
  try {
    const exisistingCity = await prisma.city.findFirst({
      where: {
       city_name: cityName,
        uf: uf,
      },
    });
    return exisistingCity !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  findIdCity,
  chekCityExists
}