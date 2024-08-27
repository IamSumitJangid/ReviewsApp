const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Review schema
const reviewSchema = new Schema({
  title: {
    type: String,
    required: true, // The title field is required
  },
  content: {
    type: String,
    required: true, // The content field is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Set default value to current date
  },
});

// Create and export the Review model
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;