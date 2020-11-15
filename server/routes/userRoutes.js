const express = require('express')
const router = express.Router()
const { profile, search, follow, unfollow, getFollowers, getFollowing } = require('./user')
const requireLogin = require('../middlewares/requireLogin')

// profile route
router.get('/profile/:userId', requireLogin, profile)

// Search users
router.post('/search', requireLogin, search)

// Follow a user
router.patch('/follow', requireLogin, follow)

// Unfollow a user
router.patch('/unfollow', requireLogin, unfollow)

// Get Followers
router.get('/getfollowers/:userId', requireLogin, getFollowers)

// Get Following
router.get('/getFollowing/:userId', requireLogin, getFollowing)

module.exports = router
