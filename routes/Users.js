const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const middleware = require('../middleware')
const { check, validationResult } = require('express-validator')

//Database Model
const User = require('../models/User')

const registerCheck = [
    check('name', 'Please enter Name').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
]

router.post('/', registerCheck, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        user = new User({
            name,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        const payload = {
            user: {
                id: user.id,
            },
        }

        res.json(payload)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//TODO: Refactor into three separte routes for each update.
router.put('/editprofile', middleware.isAuthenticated, async (req, res) => {
    try {
        let updatedUser
        const { profilePicture, background, banner } = req.body

        if (/\S/.test(profilePicture)) {
            console.log('Profile Picture Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                profilePicture: profilePicture,
            })
        }
        if (/\S/.test(background)) {
            console.log('Background Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                backgroundPicture: background,
            })
        }
        if (/\S/.test(banner)) {
            console.log('Banner Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                profileBanner: banner,
            })
        }

        res.json(updatedUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//JOIN NEW SERVER
router.put('/joinserver/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        let updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { joinedServers: req.params.id },
        })
        res.json(updatedUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//SEND FRIEND REQUEST
router.put('/sendfriendrequest/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        let requestSender = await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { pendingFriendRequests: req.params.id },
        })

        let requestReceiver = await User.findByIdAndUpdate(req.params.id, {
            $addToSet: { incomingFriendRequests: req.user.id },
        })

        res.json(requestSender)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//ACCEPT FRIEND REQUEST
router.put('/acceptfriendrequest/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        let currentUser = await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { friendList: req.params.id },
            $pull: { incomingFriendRequests: req.params.id },
        })

        let friendToAdd = await User.findByIdAndUpdate(req.params.id, {
            $addToSet: { friendList: req.user.id },
            $pull: { pendingFriendRequests: req.user.id },
        })

        res.json(friendToAdd)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//GET ALL FRIEND REQUESTS
router.get('/friendrequests', middleware.isAuthenticated, async (req, res) => {
    try {
        const { incomingFriendRequests } = await User.findById(req.user.id, 'incomingFriendRequests')

        let incomingRequests = []

        for (const id of incomingFriendRequests) {
            const profile = await User.findById(id)
            const profileInfoObject = {
                _id: id,
                name: profile.name,
                email: profile.email,
                profilePicture: profile.profilePicture,
                profileBanner: profile.profileBanner,
                screenShots: profile.screenShots,
            }
            incomingRequests.push(profileInfoObject)
        }

        res.json(incomingRequests)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//GET ALL FRIENDS
router.get('/friends', middleware.isAuthenticated, async (req, res) => {
    try {
        const { friendList } = await User.findById(req.user.id, 'friendList')

        let friends = []

        for (const id of friendList) {
            const profile = await User.findById(id)
            const profileInfoObject = {
                _id: id,
                name: profile.name,
                email: profile.email,
                profilePicture: profile.profilePicture,
                profileBanner: profile.profileBanner,
                screenShots: profile.screenShots,
                backgroundPicture: profile.backgroundPicture,
                onlineStatus: profile.onlineStatus,
            }
            friends.push(profileInfoObject)
        }

        res.json(friends)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//GET ALL PROFILES
router.get('/profile', middleware.isAuthenticated, async (req, res) => {
    try {
        const allProfiles = await User.find()

        let profileInfoArray = []

        allProfiles.forEach((user) => {
            const { _id, name, email, profilePicture, profileBanner, backgroundPicture, screenShots, onlineStatus } = user
            const profileInfoObject = {
                _id: _id,
                name: name,
                email: email,
                profilePicture: profilePicture,
                profileBanner: profileBanner,
                backgroundPicture: backgroundPicture,
                screenShots: screenShots,
                onlineStatus: onlineStatus,
            }
            profileInfoArray.push(profileInfoObject)
        })

        res.json(profileInfoArray)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//GET A PROFILE
router.get('/profile/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        const profile = await User.findById(req.params.id)

        const { name, backgroundPicture, profilePicture, profileBanner, screenShots, _id, onlineStatus } = profile

        const profileInfo = {
            _id: _id,
            name: name,
            backgroundPicture: backgroundPicture,
            profilePicture: profilePicture,
            profileBanner: profileBanner,
            screenShots: screenShots,
            onlineStatus: onlineStatus,
        }

        res.json(profileInfo)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
