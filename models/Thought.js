const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        validate: [({ length }) => length > 1 || length < 280, 'Keep reactions less then 280 characters']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdVal => dateFormat(createdVal)
    }
});

const ThoughtSchema = new Schema({
    thoughText: {
        type: String,
        //validate: [({ length }) => length > 1 || length < 280, 'Thoughts may not exceed 280 characters'],
        //required: 'You must enter text'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdVal => dateFormat(createdVal)
    },
    username: {
        type: String,
        require: true
    },
    reactions: [ReactionSchema]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

const Reaction = model('Reaction', ReactionSchema);

module.exports = { Thought, Reaction };