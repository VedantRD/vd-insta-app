const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        trim: true
    },
    likes: [{
        type: ObjectId,
        ref: 'User',
    }],
    comments: [{
        text: String,
        created: String,
        postedBy: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    photo: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

mongoose.model('Post', postSchema)