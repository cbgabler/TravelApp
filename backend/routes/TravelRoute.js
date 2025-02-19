import express from 'express';
import {
    createTravel,
    getAllTravels,
    getTravelById,
    updateTravel,
    deleteTravel,
    getTravelsByLoc
} from '../controllers/TravelControllers.js';

const router = express.Router();

// Create a new travel post
router.post('/', createTravel);

// Get all travel posts
router.get('/', getAllTravels);

// Get a single travel post by ID
router.get('/:id', getTravelById);

// Get a single travel by location
router.get('/:location', getTravelsByLoc)

// Update a travel post by ID
router.put('/:id', updateTravel);

// Delete a travel post by ID
router.delete('/:id', deleteTravel);

export default router;