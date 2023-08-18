import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//List
export const listInterviews =async (req: Request, res: Response): Promise<void> => {
  try {
    const interviews = prisma.interview.findMany({
      include: {
        search: true
      }
    });
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Entrevistas'});
  }
};