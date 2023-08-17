const express = require('express');
const router = express.Router();

const stageController = require('../controllers/stageController');

//List
router.get('/', stageController.listStages);
//Create
router.post('/', stageController.createStage);
//Update
router.put('/:id', stageController.updateStage);
//Delete
router.delete('/:id', stageController.deleteStage);

module.exports = router;
