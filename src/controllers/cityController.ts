import { Request, Response } from "express";
import { prismaClient } from "../lib/prisma";

const prisma = prismaClient;

const { findCityId, chekCityExists, getCityById } = require('../services/cityServices');

//List
export const listCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const cities = await prisma.city.findMany();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar cidades cadastradas.' });
  }
};
//Create
export const createCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city_name, ibge, uf } = req.body;
    //verificar se existe cidade com mesmo nome e estado
    const chekCity = await chekCityExists(city_name, uf);
    if (chekCity) {
      res.status(404).json({ error: `Já existe uma cidade cadastrada com o mesmo nome ${city_name} e UF: ${uf}.` });
      return;
    }
    const newCity = await prisma.city.create({
      data: {
        city_name,
        ibge,
        uf,
      },
    });
    res.json(newCity);

  } catch (error) {
    console.error(error);
    res.status(500).json("Erro ao cadastrar cidade.");
  }
};
//Update
export const updateCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const cityId = parseInt(req.params.id);
    const {city_name, ibge, uf } = req.body;
    const cityExists = await findCityId(cityId);
    if (!cityExists){
      res.status(400).json({ error: `Erro ao atualizar! A cidade com ID ${cityId} não existe.`});
      return; //Encerra
    }
    console.log(cityExists);

    const updateCity = await prisma.city.update({
      where: {id: cityId},
      data: {
        city_name,
        ibge,
        uf,
      },
    });
    res.json(updateCity)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar cidade.'});
  }
};
//Delete
export const deleteCity = async (req: Request, res: Response): Promise<void> => {
  const id  = parseInt(req.params.id); 
  try {
    await prisma.city.delete({
      where: { id }
    });
    res.json({message: 'Cidade removida com sucesso.'});
  } catch (error) {
    console.error(error)
    res.status(500).json({error: `Erro ao tentar remover o setor.`});   
  }
};
//
export const getCityId = async (req: Request, res: Response): Promise<void> => {
try {
  const cityId = parseInt(req.params.id)
  const cityExists = await getCityById(cityId);
    if (!cityExists){
      res.status(400).json({ error: `Erro ao buscar, a cidade com ID ${cityId} não existe.`});
      return; //Encerra
    }
    console.log(cityExists);
    res.json(cityExists)
  
} catch (error) {
  console.log(error)
  res.status(500).json({error: `Erro ao tentar localizar a cidade!`})
} 
}
 