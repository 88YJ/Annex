const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const config = require('config')
const middleware = require('../middleware')
const { check, validationResult } = require('express-validator')

const authCheck = [check('email', 'Please Enter Valid Email').isEmail(), check('password', 'Password is required').exists()]

//Database Model
const User = require('../models/User')

router.get('/', middleware.isAuthenticated, async (req, res) => {
    try {
        res.json(await User.findById(req.user.id).select('-password'))
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.post('/', authCheck, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }

        const payload = {
            user: {
                id: user.id,
            },
        }

        user.password = undefined

        jsonWebToken.sign(payload, config.get('jwtSecret'), { expiresIn: 999999 }, (error, token) => {
            if (error) throw error
            res.json({ token, user })
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
