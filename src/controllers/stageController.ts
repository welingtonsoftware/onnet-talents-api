import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const {findStageId} = require('../services/stageServices');
//List
export const listStages = async (req: Request, res: Response): Promise<void> => {
  try {
    const stages = await prisma.stage.findMany();
    res.json(stages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar o estágio do progresso' });
  }
};
//Create
export const createStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stage, note, active, value } = req.body;
    const newStage = await prisma.stage.create({
      data: {
        stage,
        note,
        active, 
        value
      }
    });
    res.json(newStage);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar estágio de progresso.' });
  }
};
//Update
export const updateStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { stage, note, active, value } = req.body;
    //Verifica se existe estágio
    const stageExists = await findStageId(parseInt(id));
    if (!stageExists) {
      res.status(404).json({ error: `O estágio com Id: ${id} não existe.` });
      return;
    }
    console.log('Data:', stageExists);

    const updateStage = await prisma.stage.update({
      where: { id: parseInt(id) },
      data: {
        stage,
        note,
        active,
        value
      }
    });
    res.json(updateStage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o estágio do processo.'});
  }
};
//Delete
export const deleteStage =async (req: Request, res: Response): Promise<void> => {
  const stageId = parseInt(req.params.id);
  try {
    const stageExists = await findStageId(stageId);
    if (!stageExists){
      res.status(404).json({ error: `O estágio do processo com ID: ${stageId}, não foi encontrado.`});
      return;
    };

    await prisma.stage.delete({
      where: {id: stageId},
    });
    res.json({message: 'Estágio do processo foi removido.'});    
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao tentar remover estágio do processo.'});
  }
};