import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findSearchId } = require('./helpers/searchServices');
const { findQuestId }= require('./helpers/questServices');

//List
export const listSearchQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchQuestions = await prisma.search_quest.findMany();
    res.json(searchQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar questões de pesquisa.'});
  }
};
//Create
export const createSearchQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchId, questId } = req.body;
    const searchExists = await findSearchId(searchId);
    if (!searchExists){
      res.status(404).json(`A pesquisa com Id:${searchId} não existe.`);
      return;
    }
    const questionExists = await findQuestId(questId);
    if (!questionExists){
      res.status(404).json(`A questão com Id:${questId} não existe.`);
      return;
    }

    const newSearchQuestion = await prisma.search_quest.create({
      data: {
        searchId,
        questId,
      },
    });
    res.json(newSearchQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar questão de pesquisa.'});
  }
}