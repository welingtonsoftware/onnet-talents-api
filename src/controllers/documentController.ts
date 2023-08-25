import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const fs = require('fs');
const express = require('express');
const prisma = new PrismaClient();
const router = express.Router();

const { findApplicantId } = require('./helpers/applicantServices');
const { createApplicantDirectory } = require('./helpers/documentServices');
const { findDocumentId } =require('./helpers/documentServices');

// Rota para listar todos caminhos criados
export const listDocumentPaths = async (req: Request, res: Response) => {
  try {
    const document = await prisma.document.findMany();
    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar paths.." });
  }
};
//Create
export const upDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.params)
    const { applicantId } = req.params;
    const file = req.file;


    if (!file) {
      res.status(400).json({ error: 'Arquivo não encontrado' });
    }

    // Verifica se o diretório do candidato existe
    const pathCodApplicant = await createApplicantDirectory(parseInt(applicantId))

    const { path , originalname } = req.file;
    console.log('Caminho do arquivo temporário:', path);
    console.log('Nome original do arquivo:', originalname);

    //Verificar id, se candidato existe
    const applicant = await findApplicantId(parseInt(applicantId));
    if (!applicant) {
      res.status(404).json({ error: 'Não encontramos nenhum canditato com id: ', applicantId });
      return;
    }

    //Definir o novo caminho para o arquivo
    const newPath = `uploads/${applicantId}/${originalname}`;
    console.log('caminho new: ', newPath);
    //Mover o arquivo para o diretório
    fs.renameSync(path, newPath);

    //Salvar path do arquivo
    const newDocument = await prisma.document.create({
      data: {
        path: newPath,
        type: parseInt(req.body.type),
        applicant: {
          connect: { id: parseInt(applicantId)}
        },
      },
    });
    res.json(newDocument);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer o upload do arquivo.' });
  }

};
//Delete
export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { documentId } = req.params;
    const document = await findDocumentId(parseInt(documentId));

    if(!document){
      res.status(404).json({error: 'Documento não foi encontrato'});
      return;
    }

    //Remove doc
    if(fs.existsSync(document.path)){
      fs.unlinkSync(document.path);
    }

    //Remove bd
    await prisma.document.delete({
      where : {id: parseInt(documentId)},
    });
    res.json({messange: 'Documento removido com sucesso.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao remover o documento.'});
  }
};

