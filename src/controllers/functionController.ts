import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { findIdFunction } = require('./helpers/functionServices');
const { chekFunctionExists } = require('./helpers/functionServices');

const prisma = new PrismaClient();

//List
export const listFunctions = async (req: Request, res: Response): Promise<void> => {
  try {
    const functions = await prisma.function.findMany();
    res.json(functions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar funções cadastradas.' })
  }
};
//Create
export const createFunction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { function: functionName, active } = req.body;

    //verifica se o nome da função não está cadastrado
    const checkFunction = await chekFunctionExists(functionName);
    if (checkFunction){
      res.status(400).json({ error: `Já existem uma função por nome ${functionName} cadastrada.`});
      return;
    }

    const newFunction = await prisma.function.create({
      data: {
        function: functionName,
        active,
      },
    });

    res.json(newFunction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a função. ' });
  }
};
//Update function
export const updateFunction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { function: functionName, active } = req.body;
    //Verificar id function
    const existingFunction = await findIdFunction(parseInt(id));
    if (!existingFunction) {
      res.status(404).json({ error: `Não encontramos nenhuma função com ID ${id}. Função não encontrada.`});
      return;
    }

    const updateFunction = await prisma.function.update({
      where: {
        id: parseInt(id),
      },
      data: {
        function: functionName,
        active,
      },
    });
    res.json(updateFunction);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a função.' });
  }
};



