const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController');

//List
router.get('/', answerController.listAnswer);
//Create
router.post('/', answerController.createAnswer);
//Update
router.put('/:id', answerController.updateAnswer);

module.exports = router;