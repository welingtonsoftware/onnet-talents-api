import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findQuestId } = require('./helpers/questServices');
const { findInterviewId } = require('./helpers/interviewServices');
const { findAnswerId } = require('./helpers/answerServices');

//List
export const listAnswer =async (req: Request, res: Response): Promise<void> => {
  try {
    const answers = await prisma.answer.findMany();
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar respostas.' });
  }
};
//Create
export const createAnswer =async (req: Request, res: Response): Promise<void> => {
  try {
    const { answer_text, correct, questId, interviewId } = req.body;
    const questionExist =  await  findQuestId(questId);
    if (!questionExist){
      res.status(404).json({ error: `O Id:${ questId } da pesquisa enviada não existe.`});
      return;
    }
    const interviewExist = await findInterviewId(interviewId);
    if (!interviewExist){
      res.status(404).json({ error: `O Id:${ interviewId } da entrevista enviada não existe.`});
      return;
    }

    const newAnswer = await prisma.answer.create({
      data: {
        answer_text, 
        correct,
        questId,
        interviewId,
      },
    });
    res.json(newAnswer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar a resposta. | ' + error + ' |' });
  }
};
//Update
export const updateAnswer =async (req: Request, res: Response): Promise<void> => {
  try {
    const answerId = parseInt(req.params.id);
    const { answer_text, correct, questId, interviewId } = req.body;
    
    const answerExistis = await findAnswerId(answerId);
    if(!answerExistis){
      const errorMessage = `O Id: ${ answerId } da resposta enviada não existe.`;
      res.status(404).json({ error: errorMessage });
      return;
    }

    const questionExist = await findQuestId(questId);
    if(!questionExist){
      const errorMessage = `O Id: ${questId} da questão enviada não existe.`;
      res.status(404).json({ error: errorMessage});
      return;
    }

    const interviewExist = await findInterviewId(interviewId);
    if (!interviewExist){
      const errorMessage = `O Id: ${interviewId} da entrevista enviada não existe.`;
      res.status(404).json({ error: errorMessage});
      return;
    }

    const updateAnswer = await prisma.answer.update({
      where: {id: answerId},
      data: {
        answer_text,
        correct,
        questId,
        interviewId,
      }
    });
    res.json(updateAnswer);
  } catch (error) {
    console.error('Erro: ', error);
    res.status(500).json({ error: 'Erro ao atualizar a resposta.'});
  }
};