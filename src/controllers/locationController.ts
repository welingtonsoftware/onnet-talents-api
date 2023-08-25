import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const { findLocationId } = require('../controllers/helpers/locationServices');
const { chekLocationExists } = require('../controllers/helpers/locationServices');

//List all 
export const listLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar localizações.' });
  }
};
//Create
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { unit, note } = req.body;

    const locationExist = await chekLocationExists(unit);
    if (locationExist) {
      const errorMessage = `Já existe uma unidade/localização com o ${unit} cadastrada.`;
      res.status(404).json({ error: errorMessage });
      return;
    }

    const newLocation = await prisma.location.create({
      data: {
        unit,
        note,
      },
    });
    res.json(newLocation);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao criar uma nova localização/unidade.' });
  }
};
//Update
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const locationId = parseInt(req.params.id);
    const { unit, note } = req.body;
    const locationExist = await findLocationId(locationId);
    if (!locationExist) {
      res.status(404).json({ error: `A localização com Id  ${locationId} não foi encontrada.` });
      return;
    };

    const checkLocation = await chekLocationExists(unit);
    if (checkLocation) {
      res.status(404).json({ error: `Já existe uma localização cadastrada com esse nome: ${unit}.` });
      return;
    }

    const updateLocation = await prisma.location.update({
      where: { id: locationId },
      data: {
        unit,
        note,
      },
    });
    res.json(updateLocation);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar localização.' });
  }
};
