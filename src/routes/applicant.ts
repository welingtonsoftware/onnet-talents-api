const express = require('express');
const router = express.Router();

const applicantController = require('../controllers/applicantController');
const { getApplicantWithDocuments } = require('../controllers/applicantController');

// Rota para listar candidatos
router.get('/', applicantController.listApplicant); 
// Rota para criar um novo candidato
router.post('/', applicantController.createApplicant);
// Rota para atualizar o candidato
router.put('/:id', applicantController.updateApplicant);
// Rota para pegar candidato com seus documents
router.get('/:applicantId', getApplicantWithDocuments);

module.exports = router;

