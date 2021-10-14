const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'You need a username',
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'you must enter a username',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        trim: true
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('commentCount').get(function(){
    return this.friends.length
    //reduce(total, friends => total + friends.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;