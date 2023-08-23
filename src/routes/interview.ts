const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interviewController');

//List
router.get('/', interviewController.listInterviews);
//Create
router.post('/', interviewController.createInterview);
//Update
router.put('/:id', interviewController.updateInterview);

module.exports = router;