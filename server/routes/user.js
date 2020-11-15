const mongoose = require('mongoose')
const User = mongoose.model('User')
const validator = require('validator')
require('dotenv').config({ path: '../config.env' })

// Get User Profile
profile = (req, res) => {
    const userId = req.params.userId

    User.findOne({ _id: userId })
        .then(user => {
            if (user) {
                user.password = undefined
                user.__v = undefined
                user.updatedAt = undefined
                return res.json({
                    status: 'success',
                    message: 'user profile fetched successfully',
                    user
                })
            }
        })
        .catch(err => console.log(err))
}

// Search Users
search = (req, res) => {
    let pattern = new RegExp('^' + req.body.query, 'i')
    User.find({ name: { $regex: pattern } })
        .select('name _id profilePhoto followers bio')
        .then(users => {
            res.json({
                status: 'success',
                message: `${users.length} results found`,
                users
            })
        })
        .catch(err => console.log(err))
}

// Follow a User
follow = (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.user._id } },
        { new: true },
        async (err, result) => {
            if (err) {
                return res.json({
                    status: 'failed',
                    messsage: 'could not follow the user'
                })
            }
            await User.findByIdAndUpdate(
                req.user._id,
                { $push: { following: req.body.followId } },
                { new: true }
            )
                .select('-password')
                .then(result => {

                    const activity = {
                        text: `started following you`,
                        createdAt: Date.now(),
                        doneBy: req.user,
                    }
                    User.findByIdAndUpdate(req.body.followId, { $push: { activity } }, { new: true })
                        .then((followedRes) => {
                            console.log(followedRes)
                        })
                        .catch(err => console.log(err))

                    res.json({
                        status: 'success',
                        messsage: 'successfully followed the user',
                        result
                    })
                })
                .catch(err => console.log(err))
        })
}

// Unfollow a User
unfollow = (req, res) => {
    User.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.user._id } },
        { new: true },
        async (err, result) => {
            if (err) {
                return res.json({
                    status: 'failed',
                    messsage: 'could not unfollow the user'
                })
            }
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.unfollowId } }, { new: true })
                .select('-password')
                .then(result => {
                    res.json({
                        status: 'success',
                        messsage: 'successfully unfollowed the user',
                        result
                    })
                })
                .catch(err => console.log(err))
        })
}

// Get User Followers
getFollowers = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user => {
            if (user) {
                User.find({ _id: { $in: user.followers } })
                    .then(followers => {
                        res.json({
                            status: 'success',
                            message: 'fetched user followers successfully',
                            followers
                        })
                    })
                    .catch(err => console.log(err))
            }
            else {
                return res.json({
                    status: 'failed',
                    message: 'user not found',
                })
            }
        })
        .catch(err => console.log(err))
}

// Get User Following
getFollowing = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user => {
            if (user) {
                User.find({ _id: { $in: user.following } })
                    .then(following => {
                        res.json({
                            status: 'success',
                            message: 'fetched user following successfully',
                            following
                        })
                    })
                    .catch(err => console.log(err))
            }
            else {
                return res.json({
                    status: 'failed',
                    message: 'user not found',
                })
            }
        })
        .catch(err => console.log(err))
}

module.exports = {
    profile, search, follow, unfollow, getFollowers, getFollowing
}