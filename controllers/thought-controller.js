const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id! '});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // create thought
    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: {thoughts: _id } },
                { new: true }
            );
        })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'no User found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },

    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                return res.status(400).json({ message: 'No thought found with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }

    // add reaction functionality below
}



module.exports = thoughtController;