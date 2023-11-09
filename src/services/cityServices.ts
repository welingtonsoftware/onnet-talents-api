import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findCityId(id: number) {
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
    const cityExists = await prisma.city.findFirst({
      where: {
       city_name: cityName,
        uf: uf,
      },
    });
    return cityExists !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
};

async function getCityById(id: number) {
try { 
  const city = await prisma.city.findUnique({
    where:{
      id : id
    },
  });
  return city
  
} catch (error) {
  console.log(error)
    return false
  }
}

module.exports = {
  findCityId,
  chekCityExists,
  getCityById
}