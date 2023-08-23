const express = require('express');
const router = express.Router();

const searchQuestionController = require('../controllers/searchQuestController');

//List
router.get('/', searchQuestionController.listSearchQuestions);
//Create
router.post('/', searchQuestionController.createSearchQuestion);

module.exports = router;

