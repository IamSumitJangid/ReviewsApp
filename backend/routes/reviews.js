var express = require('express');
const Review = require('../models/review');
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  

  const data = await Review.find({}).sort({ updatedAt: -1 });


  res.status(200).json(data);

});


/* GET review by id listing. */
router.get('/:id', async function(req, res, next) {
  const reviewId = req.params.id;

  const data = await Review.findOne({
    _id: new ObjectId(reviewId)
  });


  res.status(200).json(data);

});

router.post('/add', async function(req, res, next) {
  
  const requestBody = req.body;

  const data = await Review.create(requestBody);

  res.status(200).json(data);

});

router.put('/update/:id', async function(req, res, next) {
  const reviewId = req.params.id;
  const requestBody = req.body;
  requestBody.updatedAt = new Date();
  const data = await Review.findOneAndUpdate({
    _id: new ObjectId(reviewId)
  }, {
    ...requestBody
  });


  res.status(200).json(data);

});

router.delete('/delete/:id', async function(req, res, next) {
  const reviewId = req.params.id;

  await Review.deleteOne({
    _id: new ObjectId(reviewId)
  });


  res.status(200).json({ message: "Deleted Successfully."});

});

module.exports = router;
