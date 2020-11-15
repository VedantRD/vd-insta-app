const express = require('express')
const router = express.Router()
const { createPost, getAllPosts, getUserPosts, likePost, unlikePost } = require('./post')
const requireLogin = require('../middlewares/requireLogin')

// Create new Post
router.post('/createpost', requireLogin, createPost)

// Get all Posts
router.get('/allposts', requireLogin, getAllPosts)

// Get all posts of a User
router.get('/getuserposts/:userId', requireLogin, getUserPosts)

// Like the Post
router.patch('/like', requireLogin, likePost)

// Unlike the Post
router.patch('/unlike', requireLogin, unlikePost)


module.exports = router
