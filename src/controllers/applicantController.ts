// controllers/ApplicantController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const { findApplicantId } = require('./helpers/applicantServices');
const prisma = new PrismaClient();

//List
export const listApplicant = async (req: Request, res: Response) => {
  try {
    const applicants = await prisma.applicant.findMany({
      include: {
        Document: true,
        Sector:{
          include:{
            Function: true,
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
        create_at: applicant.create_at,
        Documents: applicant.Document, // Array de documentos relacionados
        Sector: applicant.Sector, // Setor relacionado
        Address: applicant.Address,
        Stage: applicant.Stage,
      };
    });
    res.json(applicantsWithDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar candidato.' });
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
      sectorId,
      addressId,
      stageId } = req.body;
    console.log('Received data: ', name, email, phone)
    if (!name) {
      res.status(400).json({ error: 'Por favor, informar campos obrigatórios (name)' });
      return;
    }
    
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
        sectorId,
        addressId,
        stageId,
      },
    });

    res.json(newApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao criar... ' });
  }
};
//Update
export const updateApplicant = async (req: Request, res: Response): Promise<void> => {
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
    sectorId,
    addressId,
    stageId } = req.body;

  try {
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
        sectorId,
        addressId,
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
        Document: true,
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