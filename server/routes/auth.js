const mongoose = require('mongoose')
const User = mongoose.model('User')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../config.env' })


// Signup
signup = (req, res) => {
    const { name, email, password } = req.body
    // console.log('in signup function')
    // TODO - Enable these validations

    // if (!name || !email || !password) {
    //     return res.json({
    //         status: 'failed',
    //         message: 'please provide all fields'
    //     })
    // }

    // if (!validator.isEmail(email)) {
    //     return res.json({
    //         status: 'failed',
    //         message: 'Invalid Email'
    //     })
    // }

    // if (password.length < 8) {
    //     return res.json({
    //         status: 'failed',
    //         message: 'password must be minimum 8 characters long'
    //     })
    // }

    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.json({
                    status: 'failed',
                    message: 'user with this email already exists'
                })
            }
            bcrypt.hash(password, 11)
                .then(hashedPassword => {
                    const user = new User({ name, email, password: hashedPassword })
                    user.save()
                        .then(user => {
                            user.password = undefined
                            user.__v = undefined
                            res.json({
                                status: 'success',
                                message: 'Signup Successful',
                                user
                            })
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

}

// Signin
signin = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.json({
                    status: 'failed',
                    message: 'invalid email or password'
                })
            }
            bcrypt.compare(password, savedUser.password)
                .then(didMatch => {
                    if (didMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                        savedUser.password = undefined
                        return res.json({
                            status: 'success',
                            message: 'Succesfully Signed In !!',
                            user: savedUser,
                            token
                        })
                    }
                    return res.json({
                        status: 'failed',
                        message: 'invalid email or password'
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

module.exports = {
    signup, signin
}