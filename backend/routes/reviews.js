var express = require('express');
const Review = require('../models/review');
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * @module ReviewRouter
 */

/**
 * GET all reviews.
 * Retrieves a list of all reviews from the database, sorted by the most recently updated.
 * 
 * @route GET /
 * @returns {Object[]} 200 - An array of review objects.
 * @returns {Error} 500 - An error occurred while retrieving the reviews.
 */
router.get('/', async function(req, res, next) {
  try {
    const data = await Review.find({}).sort({ updatedAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * GET review by ID.
 * Retrieves a single review based on the provided ID.
 * 
 * @route GET /:id
 * @param {string} id - The ID of the review to retrieve.
 * @returns {Object} 200 - A review object.
 * @returns {Error} 404 - Review not found.
 * @returns {Error} 500 - An error occurred while retrieving the review.
 */
router.get('/:id', async function(req, res, next) {
  try {
    const reviewId = req.params.id;
    const data = await Review.findOne({
      _id: new ObjectId(reviewId)
    });

    if (!data) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * POST add a new review.
 * Adds a new review to the database.
 * 
 * @route POST /add
 * @param {Object} req.body - The review data to create.
 * @returns {Object} 200 - The newly created review object.
 * @returns {Error} 500 - An error occurred while creating the review.
 */
router.post('/add', async function(req, res, next) {
  try {
    const requestBody = req.body;
    const data = await Review.create(requestBody);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT update an existing review by ID.
 * Updates an existing review in the database based on the provided ID.
 * 
 * @route PUT /update/:id
 * @param {string} id - The ID of the review to update.
 * @param {Object} req.body - The review data to update.
 * @returns {Object} 200 - The updated review object.
 * @returns {Error} 404 - Review not found.
 * @returns {Error} 500 - An error occurred while updating the review.
 */
router.put('/update/:id', async function(req, res, next) {
  try {
    const reviewId = req.params.id;
    const requestBody = req.body;
    requestBody.updatedAt = new Date();

    const data = await Review.findOneAndUpdate(
      { _id: new ObjectId(reviewId) },
      { ...requestBody },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE a review by ID.
 * Deletes a review from the database based on the provided ID.
 * 
 * @route DELETE /delete/:id
 * @param {string} id - The ID of the review to delete.
 * @returns {Object} 200 - A success message.
 * @returns {Error} 404 - Review not found.
 * @returns {Error} 500 - An error occurred while deleting the review.
 */
router.delete('/delete/:id', async function(req, res, next) {
  try {
    const reviewId = req.params.id;
    const data = await Review.deleteOne({
      _id: new ObjectId(reviewId)
    });

    if (data.deletedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
