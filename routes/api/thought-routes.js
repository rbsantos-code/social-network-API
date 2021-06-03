const router = require('express').Router();
const { model } = require('mongoose');
const { getAllThoughts, getThoughtById, addThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

// Get thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)



module.exports = router;