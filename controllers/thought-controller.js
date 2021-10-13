const { Thought } = require('../models');

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

    deleteThought( { params }, res ){
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'Error in thought creation'});
                return;
            }
            res.json(dbThoughtData);
    })
    }

    /*api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value
 */

};

module.exports = thoughtController;