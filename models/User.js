const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return isEmail(value)
            },
            message: 'Please enter a valid email address'
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


// get total count of friends 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

// create User model using UserSchema
const User = model('User', UserSchema);

// export User schema
module.exports = User;