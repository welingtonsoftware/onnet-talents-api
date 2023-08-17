const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController');
//List
router.get('/', addressController.listAddresses);
//Create
router.post('/', addressController.createAddress);
//Update
router.put('/:id', addressController.updateAddress);
//Delete
router.delete('/:id', addressController.deleteAddress);

module.exports = router;

