import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//List
export const listAnswer =async (req: Request, res: Response): Promise<void> => {
  try {
    const answers = prisma.answer.findMany();
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar respostas.' });
  }
};