const express = require('express');
const router = express.Router();

const sectorController = require('../controllers/sectorController');

//List
router.get('/', sectorController.listSectors);
//Create
router.post('/', sectorController.createSector);
//Update
router.put('/:id', sectorController.updateSector);
//Delete
router.delete('/:id', sectorController.deleteSector);
//Get by id
router.get('/:id', sectorController.getSectorById);

module.exports = router;
