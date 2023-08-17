const express = require('express');
const router = express.Router();

const functionController = require('../controllers/functionController');

//Listar funções
router.get('/', functionController.listFunctions);
//Criar nova função
router.post('/', functionController.createFunction);
//atualizar a função
router.put('/:id', functionController.updateFunction);

module.exports = router;