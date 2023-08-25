const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController');

//List
router.get('/', answerController.listAnswers);
//Create
router.post('/', answerController.createAnswer);
//Update
router.put('/:id', answerController.updateAnswer);
//Delete
router.delete('/:id', answerController.deleteAnswer);

module.exports = router;