const express = require('express');
const router = express.Router();

const cityController = require('../controllers/cityController');

//List
router.get('/', cityController.listCities);
//Create
router.post('/', cityController.createCity);
//Update
router.put('/:id', cityController.updateCity);
//Delete
router.delete('/:id', cityController.deleteCity);
//Get by Id
router.get('/:id', cityController.getCityId)

module.exports = router;

