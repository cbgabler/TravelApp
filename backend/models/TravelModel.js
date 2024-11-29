import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Travel = mongoose.model('Travel', travelSchema);

export default Travel;