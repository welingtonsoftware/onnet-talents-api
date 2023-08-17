import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findIdApplicant } = require('./helpers/applicantServices');
const { findIdStage } = require('./helpers/stageServices');
const { findIdProcess } = require('./helpers/processServices');

//List
export const listProcess =async (req: Request, res: Response): Promise<void> => {
  try {
    const process = await prisma.process.findMany({
      include: {
        stage: true,
      }
    });
    res.json(process);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar processos'});
  }
};
//Create
export const createProcess =async (req: Request, res: Response): Promise<void> => {
 const {date_process, note, active, stageId, applicantId} = req.body;
 const processId = parseInt(req.params.id);
  try {
    //Verificar se o candidato existe
    const applicantExisting = await findIdApplicant(applicantId);
    if (!applicantExisting){
      res.status(404).json({ error: `O candidato com Id ${ applicantId} não existe. Informe um candidato existente para registrar o processo`});
      return;
    }
    //Verificar se estágio existe
    const stageExisting = await findIdStage(stageId);
    if (!stageExisting){
      res.status(404).json({ error: `O estágio de Id ${ stageId} não existe. Informe um estágio existente para registrar o processo.`});
      return;
    };
    const newProcess = await prisma.process.create({
      data : {
        date_process,
        note,
        active,
        stageId,
        applicantId
      },
    });
    res.json(newProcess);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao cadastrar o processo.'});
  }
};
