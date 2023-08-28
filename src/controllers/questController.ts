import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findQuestId } = require('./helpers/questServices');

//List
export const listQuestions =async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await prisma.quest.findMany();
    res.json(questions)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar questões.'});
  }
};
//Create
export const createQuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quest, active } = req.body;
    const newQuest = await prisma.quest.create({
      data: {
        quest,
        active,
      }
    });
    res.json(newQuest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errror: 'Erro ao criar questão.'});
  }
};
//Update
export const updateQuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const questionId = parseInt(req.params.id);
    const { quest, active } = req.body;

    const questionExists = await findQuestId(questionId);
    if (!questionExists){
      res.status(404).json({ error: `A questão por Id: ${questionId} não existe.`});
      return;
    }

    const updateQuestion = await prisma.quest.update({
      where : {id: questionId},
      data: {
        quest,
        active,
      },
    });
    res.json(updateQuestion);

  } catch (error) {
    console.error(error);
    res.status(500).json('Erro ao atualizar questão.');
  }
};