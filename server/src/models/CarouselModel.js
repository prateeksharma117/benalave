import mongoose from 'mongoose';

const Carousel = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const CarouselImageSchema = mongoose.model('CarouselImage', Carousel);

export default CarouselImageSchema;