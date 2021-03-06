const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        //validate: [({ length }) => length > 1 || length < 280, 'Keep reactions less then 280 characters'],
        maxlength: 280,
        trim: true
    },
    username: {
        type: String,
        required: 'Enter username',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdVal => dateFormat(createdVal)
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        validate: [({ length }) => length > 1 || length < 280, 'Thoughts may not exceed 280 characters'],
        required: true
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
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought ;