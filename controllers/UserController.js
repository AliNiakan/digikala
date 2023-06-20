const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')

// @desc Register new user 
// @route POST /users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name, !email, !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            admin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error(' Invalid user data')
    }


})


// @desc Login user
// @route POST /users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //Check for user email
    const user = await User.findOne({ email })
    if (user && bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            lists: user.lists,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user or password')
    }
})


// @desc Get user data
// @route Get /users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email, isAdmin } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
        admin: isAdmin
    })
})


//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, getMe }