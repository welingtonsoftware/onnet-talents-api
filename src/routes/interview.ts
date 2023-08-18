const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interviewController');

//List
router.get('/', interviewController.listInterviews);

module.exports = router;