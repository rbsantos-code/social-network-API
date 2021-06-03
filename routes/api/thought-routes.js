const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

// Get thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

// Get single thought
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;