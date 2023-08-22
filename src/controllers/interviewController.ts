import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findIdSearch } = require('./helpers/searchServices');
const { validadeApplicantID } = require('./helpers/applicantServices');

//List
export const listInterviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const interviews = await prisma.interview.findMany({
      include: {
        search: true
      }
    });
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Entrevistas' });
  }
};
//Create
export const createInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    let { date_interview, note, searchId, applicantId } = req.body;
    date_interview = new Date(date_interview);
    //Verificar se existe o tipo de pesquisa
    const searchExists = await findIdSearch(searchId);
    if (!searchExists) {
      res.status(400).json({ error: `O tipo de pesquisa/entrevista com Id: ${searchId} não existe.` });
      return;
    }
    //Verificar se existe o candidato.
    const applicantExists = await validadeApplicantID(parseInt(applicantId));
    if (!applicantExists) {
      res.status(400).json({ error: `O candidado com Id: ${applicantId} não existe.` });
      return;
    }

    const newInterview = await prisma.interview.create({
      data: {
        date_interview,
        note,
        searchId,
        applicantId,
      }
    });
    res.json(newInterview);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao cadastrar a entrevista.'})
  }
};
//Update
export const updateInterview =async (req: Request, res: Response): Promise<void> => {
  
}