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


module.exports = router;