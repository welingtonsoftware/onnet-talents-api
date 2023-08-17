const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');

//Lista all Location
router.get('/', locationController.listLocations);
//create location
router.post('/', locationController.createLocation);
//update
router.put('/:id', locationController.updateLocation);

module.exports = router;
