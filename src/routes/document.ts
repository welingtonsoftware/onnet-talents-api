const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Definir o diretório para salvar
const documentController = require('../controllers/documentController');


//Listar todos os documentos
router.get('/', documentController.listDocumentPaths);
// Definir o middleware do multer para lidar com o upload de arquivos
router.post('/upload/:applicantId', upload.single('File'), documentController.upDocument);
// Remover docs
router.delete('/upload/:documentId', documentController.deleteDocument);
// Get by id
router.get('/:id', documentController.getByApplicantyId);
module.exports = router;
