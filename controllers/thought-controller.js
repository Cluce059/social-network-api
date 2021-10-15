const Thought = require('../models/Thought');
const mongoose = require('mongoose');


const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
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
            { _id: params.id }, 
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
//PUT UPDATE THOUGHT - ADD REACTION
addReaction({params, body}, res){
 Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            {$push: {reactions: body}}, 
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
    ///PUT UPDATE THOUGHT - DELETE REACTION ATTR
    deleteReaction({params, body}, res){
        Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $pull: {reaction: { reactionId: params.reactionId }}},
        { new: true }
        )
        .then(dbThoughtdata => res.json(dbThoughtdata))
        .catch(err => res.json(err));
    },
    deleteThought( { params }, res ){
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'Error in thought creation'});
                return;
            }
            res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
    }

};

module.exports = thoughtController;