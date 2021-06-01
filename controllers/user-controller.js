const { User, Thought } = require('../models');

const userController = {
    // get all Users
    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select:'-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // get single user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            // if no user is found
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}