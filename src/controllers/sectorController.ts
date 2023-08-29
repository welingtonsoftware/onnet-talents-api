import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const { findFunctionId } = require("../services/functionServices");
const { findSectorId } = require("../services/sectorServices");

//List
export const listSectors = async (req: Request, res: Response): Promise<void> => {
  try {
    const sectors = await prisma.sector.findMany({
      include: {
        Function: true,
      }
    });
    res.json(sectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar os setores.' });
  }
};
//Create
export const createSector = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name_sector, note, functionId } = req.body;
    //Validar se existe a função
    const functionExists = await findFunctionId(parseInt(functionId));
    if (!functionExists) {
      res.status(404).json({ error: `Não encontramos nenhuma função com ID ${functionId}. Para cadastrar o setor.` });
      return;
    }
    const newSector = await prisma.sector.create({
      data: {
        name_sector,
        note,
        functionId,
      },
    });
    res.json(newSector);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao criar setor.' });
  }
};
//Update
export const updateSector = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name_sector, note, functionId } = req.body;

    // Verificar se o setor existe
    const sectorExists = await findSectorId(parseInt(id));
    if (!sectorExists) {
      res.status(400).json({ error: `Erro! O setor com ID ${id} não existe.` });
      return; // Encerra a função imediatamente se o setor não existir
    }
    console.log(sectorExists);

    // Verificar se a função existe
    const functionExists = await findFunctionId(parseInt(functionId));
    if (!functionExists) {
      res.status(400).json({ error: `Erro ao atualizar! A função com ID ${functionId} não existe.` });
      return; // Encerra a função imediatamente se a função não existir
    }
    console.log(functionExists);

    const updateSector = await prisma.sector.update({
      where: { id: parseInt(id) },
      data: {
        name_sector,
        note,
        functionId,
      },
    });
    res.json(updateSector);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o setor.' });
  }
};
//Delete
export const deleteSector = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.sector.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Setor removido com sucesso.' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: `O setor com ID ${id} não existe` });
    }
    console.error(error);
    res.status(500).json({ error: `Erro ao tentar remover o setor.` });
  }
};
//Get by id
export const getSectorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const sector = await prisma.sector.findUnique({
      where: { id: parseInt(id) }
    });

    if (!sector) {
      res.status(400).json({ error: 'Setor não encontrado.' });
      return;
    }
    res.json(sector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o setor.' });
  }
};