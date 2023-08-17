const express = require('express');
const router = express.Router();

const processController = require('../controllers/processController');

//List
router.get('/', processController.listProcess);
//Create
router.post('/', processController.createProcess);

module.exports = router;