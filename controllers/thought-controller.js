const {Thought, User, Types} = require('../models');
const mongoose = require('mongoose');


const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'no thought with that id'});
                    return;
                }
                res.json(dbThoughtData)
        })
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },

    createThought( {params, body }, res){
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params.userId },
                { $push: { thoughts: _id }},
                {new: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'Error in thought creation'});
                return;
            }
            res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},

    updateThought( {params, body}, res ){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            body, 
            { new: true, runValidators: true }
            )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'Error in thought creation'});
                return;
            }
            res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},
deleteThought( { params }, res ){
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deletedThought => {
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        //remove thought from user's arr of thoughts
        return User.findOneAndUpdate(
            { _id: params.username },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
        );
    })
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

//PUT UPDATE THOUGHT - ADD REACTION
addReaction({params, body}, res){
 Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            {$push: {reactions: body}}, 
            { new: true, runValidators: true }
    )
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user with this id'});
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.json(err));
},
    ///PUT UPDATE THOUGHT - DELETE REACTION ATTR
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;