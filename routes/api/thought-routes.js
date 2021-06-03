const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

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


// Post reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// Delete reactions
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;