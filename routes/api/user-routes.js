const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

// Get all users - /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// Get user by ID - /api/users/:userId
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add friends route



module.exports = router;