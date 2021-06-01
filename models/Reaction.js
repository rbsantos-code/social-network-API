const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    // set custom Id to avoid confusion with parent
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});


// export reaction schema
module.exports = ReactionSchema;