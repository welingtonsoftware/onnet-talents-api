import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { findIdAddress } = require('./helpers/addressServices');
const { findIdNeighborhood } = require('./helpers/neighborhoodServices');
//List
export const listAddresses = async (req: Request, res: Response): Promise<void> => {
  try {
    const adreesses = await prisma.address.findMany({
      include: {
        neighborhood: {
          include: {
            city: true,
          },
        },
      },
    });
    res.json(adreesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar endereços.' });
  }
};
//Create
export const createAddress = async (req: Request, res: Response): Promise<void> => {
  const { addres_name, cep, neighborhoodId } = req.body;

  try {
    const neighborhoodExists = await findIdNeighborhood(neighborhoodId);
    if (!neighborhoodExists) {
      res.status(404).json({ error: `O bairro com ID ${neighborhoodId} não foi encontrado.` });
      return;
    }

    const newAddress = await prisma.address.create({
      data: {
        addres_name,
        cep,
        neighborhoodId,
      },
    });
    res.json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar endereço.' });
  }
};
//Update
export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  const addressId = parseInt(req.params.id);
  const { addres_name, cep, neighborhoodId } = req.body;

  try {
    //Verifica endereço
    const addressExists = await findIdAddress(addressId);
    if (!addressExists) {
      res.status(400).json({ error: `O endereço com Id ${addressId} não existe.` });
      return;
    }
    //Verifica Bairro
    const neighborhoodExists = await findIdNeighborhood(neighborhoodId);
    if (!neighborhoodExists) {
      res.status(404).json({ error: `O bairro com Id ${neighborhoodId} não existe.` });
      return;
    }

    const updateAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        addres_name,
        cep,
        neighborhoodId,
      },
    });
    res.json(updateAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar endereço.' });
  }
};
//Delete
export const deleteAddress = async (req: Request, res: Response): Promise<void> => {

  const addressId = parseInt(req.params.id);
  try {
    const addressExists = await findIdAddress(addressId);
    if(!addressExists){
      res.status(400).json({error: `O endereço com ID ${ addressId } não existe.`});
      return;
    }
    await prisma.address.delete({
      where: {id: addressId},
    });
    res.json({message: 'Endereço removido com sucesso.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao remover endereço.'});
  }
};