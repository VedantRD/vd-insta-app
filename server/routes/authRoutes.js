const express = require('express')
const router = express.Router()
const { signup, signin } = require('./auth')

// Signup User
router.post('/signup', signup)

// Signin User
router.post('/signin', signin)

module.exports = router