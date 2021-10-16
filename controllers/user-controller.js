const { User, Types } = require('../models');
const mongoose = require('mongoose');

const userController = {
    getAllUsers(req, res){
        User.find({})
         .populate({
             path: 'thoughts',
             select: '-__v'
         })
         .select('-__v')
         .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({ params }, res){
        User.findOne({ _id:  params.id })
        //.populate('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: ' no user with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    createUser( { body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'no user with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$push: { friends: params.friendId}}, 
            {new: true}
            )
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'no user with this id'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },


    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: { friends: params.friendId}}, 
            {new: true}
            )
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'no user with this id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;