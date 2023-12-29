import { Request, Response } from "express";
import { prismaClient } from "../lib/prisma";

const prisma = prismaClient;

const { neighborhoodByCityId } = require('../services/neighborhoodServices');
const { findNeighborhoodId } = require('../services/neighborhoodServices');
const { checkNeighborhoodExists } = require('../services/neighborhoodServices');
const { findCityId } = require('../services/cityServices');

//List
export const listNeighborhoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const neighborhoods = await prisma.neighborhood.findMany({
      include: {
        city: true,
      },
    });
    res.json(neighborhoods);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao listar bairros.' });
  }
};
//Create
export const createNeighborhood = async (req: Request, res: Response): Promise<void> => {
  const { neighborhood_name, cityId } = req.body;
  try {
    const cityExists = await findCityId(cityId);
    if (!cityExists) {
      res.status(404).json({ error: `A cidade com ID ${cityId} não está cadastrada.` });
      return;
    }

    const checkNeighborhood = await checkNeighborhoodExists(neighborhood_name, cityId);
    if (checkNeighborhood){
      res.status(404).json({error: `O Bairro ${neighborhood_name} para cidade de código ${cityId} já está cadastrada.`});
      return;
    }

    const newNeighborhood = await prisma.neighborhood.create({
      data: {
        neighborhood_name,
        cityId,
      },
    });
    res.json(newNeighborhood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o bairro.' });
  }
};
//Update
export const updateNeighborhood = async (req: Request, res: Response): Promise<void> => {
  try {
    const neighborhoodId = parseInt(req.params.id);
    const {neighborhood_name, cityId } = req.body;
    const neighborhoodExists = await findNeighborhoodId(neighborhoodId);
    if (!neighborhoodExists){
      res.status(400).json({error: `O bairro com ID ${ neighborhoodId} não existe.`});
      return;
    }

    const cityExists = await findCityId(cityId);
    if (!cityExists){
      res.status(400).json({error:`A cidade com Id ${ cityId} não existe.`});
      return;
    }

    const updateNeighborhood = await prisma.neighborhood.update({
      where: {id: neighborhoodId},
      data:{
        neighborhood_name,
        cityId,
      },
    });
    res.json(updateNeighborhood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o bairro.'});
  }
};
//Delete
export const deleteNeighborhood =async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    await prisma.neighborhood.delete({
      where: {id},
    });
    res.json({message: `Bairro removido com sucesso.`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao tentar remover o bairro.'});
  }
};
//Get Neighborhoods for CityId
export const getNeighborhoodsByCityId =async (req: Request, res: Response): Promise<void> => {
  try {
    const cityId = parseInt(req.params.id);
    //Verificar se existe a cidade
    const neighborhoodCityExists = await neighborhoodByCityId(cityId);
    if(!neighborhoodCityExists){
      res.status(400).json({error: `Não existe um bairro cadastrado com a cidade por Id: ${ cityId} .`});
      return
    }
    res.json(neighborhoodCityExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao buscar o bairro por cidade.'});
  }
  
}