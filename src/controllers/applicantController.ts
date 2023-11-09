// controllers/ApplicantController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const { findApplicantId } = require('../services/applicantServices');
const prisma = new PrismaClient();

//List
export const listApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await prisma.applicant.findMany({
      include: {
        Document: true,
        Function:{
          include:{
            Sector: true,
          }
        }, 
        Address: true,
        Stage: true,
      }
    });
    //mapeamento de applicants object com ou sem documents
    const applicantsWithDocuments = applicants.map((applicant) => {
      return {
        id: applicant.id,
        name: applicant.name,
        email: applicant.email,
        phone: applicant.phone,
        cpf: applicant.cpf,
        sexo: applicant.sexo,
        rg: applicant.rg,
        schooling: applicant.schooling,
        employmentStatus: applicant.employmentStatus,
        birthDate: applicant.birthDate,
        note: applicant.note,
        complement: applicant.complement,
        number: applicant.complement,
        create_at: applicant.create_at,
        Documents: applicant.Document, // Array de documentos relacionados
        Function: applicant.Function, // Function relacionado
        Address: applicant.Address,
        Stage: applicant.Stage,
      };
    });
    res.json(applicantsWithDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar candidato.' });
  }
};
// Create
export const createApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name,
      email,
      phone,
      cpf,
      sexo,
      rg,
      schooling,
      employmentStatus,
      birthDate,
      note,
      complement,
      number,
      functionId,
      addressId,
      locationId,
      stageId } = req.body;

    if (!name) {
      res.status(404).json({ error: 'Por favor, informar campos obrigatórios (name)' });
      return;
    }
    console.log('Data applicant: ', req.body);
    
    const newApplicant = await prisma.applicant.create({
      data: {
        name,
        email,
        phone,
        cpf,
        sexo,
        rg,
        schooling,
        employmentStatus,
        birthDate,
        note,
        complement,
        number,
        functionId,
        addressId,
        locationId,
        stageId,
      },
    });

    res.json(newApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o candidato.' });
  }
};
//Update
export const updateApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicantId = parseInt(req.params.id);
    const { name,
      email,
      phone,
      cpf,
      sexo,
      rg,
      schooling,
      employmentStatus,
      birthDate,
      note,
      complement,
      number,
      functionId,
      addressId,
      locationId,
      stageId } = req.body;
    //Verificar id applicant
    const isValidApplicantId = await findApplicantId(applicantId);
    if (!isValidApplicantId) {
      res.status(404).json({ error: 'Não encontramos nenhum canditato com id: ', applicantId });
      return;
    }

    const applicant = await prisma.applicant.update({
      where: { id: applicantId },
      data: {
        name,
        email,
        phone,
        cpf,
        sexo,
        rg,
        schooling,
        employmentStatus,
        birthDate,
        note,
        complement,
        number,
        functionId,
        addressId,
        locationId,
        stageId,
      },
    });
    res.json(applicant);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar candidato. " });
  }
};
//Rota Applicant e documents
export const getApplicantWithDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { applicantId } = req.params;

    const getApplicantWithDocuments = await prisma.applicant.findUnique({
      where: { id: parseInt(applicantId) },
      include: {
        Address: {
          include:{
            neighborhood: true
          }
        },
        Stage: true,
        Location: true,
        Document: true,
        Function: {
          include:{
            Sector: true
          }
        } 
      },
    });

    if (!getApplicantWithDocuments) {
      res.status(404).json({ error: 'Candidado não encontrato.' });
      return;
    }

    res.json(getApplicantWithDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data ' });

  }
};