import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { checkSearch } = require('./helpers/searchServices');
const { findSearchId } = require('./helpers/searchServices');

//List
export const listResearches = async (req : Request, res: Response): Promise<void> => {
  try {
    const researches = await prisma.search.findMany();
    res.json(researches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar pesquisas.'});
  }
};
//Create
export const createSearch =async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, active } = req.body;
    const existingSearch = await checkSearch(type);
    if (existingSearch){
      res.status(400).json({ error: `A pesquisa ${ type } já está cadastrada.`});
      return;
    }
    const newSearch = await prisma.search.create({
      data: {
        type,
        active,
      }
    });
    console.log('aqui', newSearch)
    res.json(newSearch);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar pesquisa.'});
  }
  
};
//Update
export const updateSearch =async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {type, active} = req.body;

    const searchExists = await findSearchId(parseInt(id));
    if(!searchExists){
      res.status(400).json({ error: `Erro. A pesquisa com ID: ${ id }, não foi encontrada.`});
      return;
    }

    const updateSearch = await prisma.search.update({
      where : { id: parseInt(id) },
      data: {
        type,
        active,
      }
    });
    res.json(updateSearch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pesquisa.'});
  }
};