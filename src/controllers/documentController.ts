import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const fs = require('fs');
const express = require('express');
const prisma = new PrismaClient();
const router = express.Router();

const { findApplicantId } = require('../services/applicantServices');
const { createApplicantDirectory } = require('../services/documentServices');
const { findDocumentId } = require('../services/documentServices');
const { findDocumentsApllicant } = require('../services/documentServices');

//Rota para listar todos caminhos criados
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
      return;
    }

    // Verifica se o diretório do candidato existe
    const pathCodApplicant = await createApplicantDirectory(parseInt(applicantId))

    const { path, originalname } = req.file;
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
          connect: { id: parseInt(applicantId) }
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

    if (!document) {
      res.status(404).json({ error: `Documento com ${documentId} não foi encontrado.` });
      return;
    }

    console.log('Data: ', document);
    //Remove doc
    if (fs.existsSync(document.path)) {
      console.log('Documento ' + documentId + ' removido do diretório.');
      fs.unlinkSync(document.path);
      //Remove bd
      await prisma.document.delete({
        where: { id: parseInt(documentId) },
      });
      res.json({ messange: 'Documento removido com sucesso.' });
    }
    else{
      res.json({messange: 'Documento não foi localizado no diretório.' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover o documento.' });
  }
};
//Get By Id
export const getByApplicantyId =async (req: Request, res: Response): Promise<void> => {
  try {
    const applicantId = parseInt(req.params.id);
    const documentsAplicant = await findDocumentsApllicant(applicantId);

    if (!documentsAplicant){
      res.status(404).json({ error : 'Documentos do cliente não foram encontratos.'});
    }

    res.json(documentsAplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar documentos do candidado.'});
  }
};

