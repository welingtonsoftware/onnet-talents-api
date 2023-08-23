const express = require('express');
const router = express.Router();

const questController = require('../controllers/questController');

//List
router.get('/', questController.listQuestions);
//Create
router.post('/', questController.createQuest);
//Update
router.put('/:id', questController.updateQuest);

module.exports = router;