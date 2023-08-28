import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findSearchId } = require('./helpers/searchServices');
const { findApplicantId } = require('./helpers/applicantServices');
const { findInterviewId } = require('./helpers/interviewServices');

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
    res.status(500).json({ error: 'Erro ao listar entrevistas.' });
  }
};
//Create
export const createInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    let { date_interview, note, searchId, applicantId } = req.body;
    date_interview = new Date(date_interview);
    //Verificar se existe o tipo de pesquisa
    const searchExists = await findSearchId(searchId);
    if (!searchExists) {
      res.status(404).json({ error: `O tipo de pesquisa/entrevista com Id: ${searchId} não foi encontrado.` });
      return;
    }
    //Verificar se existe o candidato.
    const applicantExists = await findApplicantId(parseInt(applicantId));
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
  try {
    const  id  = parseInt(req.params.id);
    let { date_interview ,note ,searchId ,applicantId } = req.body;
    date_interview = new Date(date_interview);
    //Verificar se a entrevista existe
    const inteviewExists = await findInterviewId(id);
    if(!inteviewExists){
      res.status(404).json({ error: `A entrevista com Id:${id} não existe.`});
      return;
    }
    //Verificar se o candidado existe
    const applicantExists = await findApplicantId(applicantId);
    if (!applicantExists){
      res.status(404).json({ error: `O Candidato com Id:${applicantId} informado para entrevista não existe.`});
      return;
    }
    //Verifica se o tipo da pesquisa/avaliação existe
    const searchExists = await findSearchId(searchId);
    if (!searchExists){
      res.status(404).json({ error: `A pesquisa ou avaliação com Id:${searchId} informado para entrevista não existe.`});
      return;
    }

    const updateInterview = await prisma.interview.update({
      where: {id},
      data: {
        date_interview,
        note,
        searchId,
        applicantId,
      }
    });
    res.json(updateInterview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar entrevista.'});
    //res.status(500).json({ error: (error as Error).name });
  }
};