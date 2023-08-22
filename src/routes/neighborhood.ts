const express = require('express');
const router = express.Router();

const neighborhoodController = require('../controllers/neighborhoodController');

//List
router.get('/', neighborhoodController.listNeighborhoods);
//Post
router.post('/', neighborhoodController.createNeighborhood);
//Post
router.put('/:id', neighborhoodController.updateNeighborhood);
//Delete
router.delete('/:id', neighborhoodController.deleteNeighborhood);
//Get By City id
router.get('/:id', neighborhoodController.getNeighborhoodsByCityId);


module.exports = router;