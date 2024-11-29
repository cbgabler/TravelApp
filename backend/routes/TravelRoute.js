import express from 'express';
import {
    createTravel,
    getAllTravels,
    getTravelById,
    updateTravel,
    deleteTravel
} from '../controllers/TravelControllers.js';

const router = express.Router();

// Create a new travel post
router.post('/', createTravel);

// Get all travel posts
router.get('/', getAllTravels);

// Get a single travel post by ID
router.get('/:id', getTravelById);

// Update a travel post by ID
router.put('/:id', updateTravel);

// Delete a travel post by ID
router.delete('/:id', deleteTravel);

export default router;