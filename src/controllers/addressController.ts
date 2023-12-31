import { Request, Response } from "express";
import { prismaClient } from "../lib/prisma"


const prisma = prismaClient;

const { findAddressId } = require('../services/addressServices');
const { findNeighborhoodId } = require('../services/neighborhoodServices');
const { addressByNeighborhoodId } = require('../services/addressServices');
//List
export const listAddresses = async (req: Request, res: Response): Promise<void> => {
  try {
    const adrresses = await prisma.address.findMany({
      include: {
        neighborhood: {
          include: {
            city: true,
          },
        },
      },
    });
    res.json(adrresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar endereços.' });
  }
};
//Create
export const createAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { addres_name, cep, neighborhoodId } = req.body;
    const neighborhoodExists = await findNeighborhoodId(neighborhoodId);
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
  try {
    const addressId = parseInt(req.params.id);
    const { addres_name, cep, neighborhoodId } = req.body;
    //Verifica endereço
    const addressExists = await findAddressId(addressId);
    if (!addressExists) {
      res.status(404).json({ error: `O endereço com Id ${addressId} não existe.` });
      return;
    }
    //Verifica Bairro
    const neighborhoodExists = await findNeighborhoodId(neighborhoodId);
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
    const addressExists = await findAddressId(addressId);
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
//Get address by NeiId
export const getAddressNeighborhoodId = async (req: Request, res: Response): Promise<void> => {
  try {

    const neighborhoodId = parseInt(req.params.id);
    const addressNeighborhoodIdExists = await addressByNeighborhoodId(neighborhoodId);
    console.log('teste', req.params)
    if(isNaN(neighborhoodId)){
      throw new Error(`O valor enviado (${ req.params.id }) não é um ID válido.`);
    }

    if(!addressNeighborhoodIdExists){
      res.status(400).json({ error: addressNeighborhoodIdExists});
    }
    res.json(addressNeighborhoodIdExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Erro ao buscar logradouro por bairro. | " + error + " |"});
  }
};