const { Thought, Reaction } = require('../models/Thought');
const mongoose = require('mongoose');


const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
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
                res.json(dbThoughtdata)
        })
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },

    createThought( { body }, res){
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

    updateThought( {params, body }, res ){
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
createReaction({params, body}, res){
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({ message: 'Error in thought creation'});
            return;
        }
        res.json(dbThoughtData);
})
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

    /*thoughts/:thoughtId/reactionId

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value
 */

};

module.exports = thoughtController;