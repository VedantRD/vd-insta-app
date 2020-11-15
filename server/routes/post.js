const mongoose = require('mongoose')
const validator = require('validator')
require('dotenv').config({ path: '../config.env' })

// Requiring Models
const User = mongoose.model('User')
const Post = mongoose.model('Post')


// ---------------- Functions ------------------- //

// Create new Post
const createPost = (req, res) => {
    const { body, photo } = req.body
    // console.log(req.body)
    if (!body || !photo) {
        return res.json({
            status: 'failed',
            message: 'please fill all fields'
        })
    }
    req.user.password = undefined
    const post = new Post({ body, photo, postedBy: req.user })
    post.save()
        .then((post) => {
            return res.json({
                status: 'success',
                message: 'new post added successfully !',
                post
            })
        })
        .catch(err => console.log(err))
}

// Get all Posts
const getAllPosts = (req, res) => {
    Post.find()
        .populate('postedBy comments.postedBy', { 'password': 0 })
        .sort('-postedAt')
        .then(posts => {
            res.json({
                status: 'success',
                message: 'all posts are fetched successfully',
                posts
            })
        })
        .catch(err => console.log(err))
}

// Get User Posts
const getUserPosts = (req, res) => {
    const userId = req.params.userId
    Post.find({ postedBy: userId })
        .then(posts => {
            return res.json({
                status: 'success',
                message: 'fetched user posts successfully !',
                posts
            })
        })
        .catch(err => console.log(err))
}

// Like the Post
const likePost = (req, res) => {
    Post.findByIdAndUpdate(
        { _id: req.body.postId },
        { $push: { likes: req.user._id } },
        { new: true }
    )
        .then(post => {
            if (req.user._id != req.body.postedByID) {
                const activity = {
                    text: `liked your post`,
                    createdAt: Date.now(),
                    doneBy: req.user,
                    postId: req.body.postId
                }
                User.findByIdAndUpdate(req.body.postedByID, { $push: { activity } }, { new: true })
                    .then((likedRes) => {
                    })
                    .catch(err => console.log(err))
            }

            res.json({
                status: 'success',
                message: 'post liked',
                post
            })
        })
        .catch(err => { console.log(err) })
}

// Unlike the Post
const unlikePost = (req, res) => {
    Post.findByIdAndUpdate(
        { _id: req.body.postId },
        { $pull: { likes: req.user._id } },
        { new: true }
    )
        .then(post => {
            res.json({
                status: 'success',
                message: 'post unliked',
                post
            })
        })
        .catch(err => { console.log(err) })
}

module.exports = {
    createPost, getAllPosts, getUserPosts, likePost, unlikePost
}