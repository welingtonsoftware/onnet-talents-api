const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');

//List
router.get('/', searchController.listResearches);
//Create
router.post('/', searchController.createSearch);
//Update
router.put('/:id', searchController.updateSearch);
//Get By Id
router.get('/:id', searchController.getSearchById);

module.exports = router;