import Travel from '../models/TravelModel.js';

// Create a new travel post
export const createTravel = async (req, res) => {
    const { title, text, date, location } = req.body;

    if (!title || !text || !date || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newTravel = new Travel({ title, text, date, location });
        await newTravel.save();
        res.status(201).json(newTravel);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create travel post.' });
    }
};

// Get all travel posts
export const getAllTravels = async (req, res) => {
    try {
        const travels = await Travel.find();
        res.status(200).json(travels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch travel posts.' });
    }
};

// Get a single travel post by ID
export const getTravelById = async (req, res) => {
    const { id } = req.params;

    try {
        const travel = await Travel.findById(id);
        if (!travel) {
            return res.status(404).json({ error: 'Travel post not found.' });
        }
        res.status(200).json(travel);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch travel post.' });
    }
};

// Get all travel posts by location
export const getTravelsByLoc = async (req, res) => {
    const {location} = req.params;

    try {
        const travels = await Travel.find({ location })
        if (!travels) {
            return res.status(404).json({ error: `There are no travels that exist in ${location}` });
        }
        res.status(200).json(travels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch travel posts.'})
    }
    
}

// Update a travel post by ID
export const updateTravel = async (req, res) => {
    const { id } = req.params;
    const { title, text, date, location } = req.body;

    if (!title || !text || !date || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const updatedTravel = await Travel.findByIdAndUpdate(id, { title, text, date, location }, { new: true });
        if (!updatedTravel) {
            return res.status(404).json({ error: 'Travel post not found.' });
        }
        res.status(200).json(updatedTravel);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update travel post.' });
    }
};

export const deleteTravel = async (req, res) => {
  try {
    const result = await Travel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ Error: 'Not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};