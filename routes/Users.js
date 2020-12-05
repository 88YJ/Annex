const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const middleware = require('../middleware')
const { check, validationResult } = require('express-validator')

//Database Model
const User = require('../models/User')
const Server = require('../models/Server')

//TODO: Refactor into three separte routes for each update.
router.put('/editprofile', middleware.isAuthenticated, async (req, res) => {
    try {
        let updatedUser
        const { name, profilePicture, background, banner, bio, location, screenShot } = req.body
        if (/\S/.test(name)) {
            console.log('Profile Name Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                name: name,
            })
        }
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
        if (/\S/.test(bio)) {
            console.log('Bio Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                bio: bio,
            })
        }
        if (/\S/.test(location)) {
            console.log('Location Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                location: location,
            })
        }
        if (/\S/.test(screenShot)) {
            console.log('ScreenShot Uploaded')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                $addToSet: { screenShots: screenShot },
            })
        }

        res.json(updatedUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//Edit Color Scheme
router.put('/editscheme', middleware.isAuthenticated, async (req, res) => {
    try {
        let updatedUser
        const {
            background,
            primaryHeader,
            secondaryHeader,
            tertiaryHeader,
            outLine,
            secondaryOutline,
            activeOutline,
            primaryBackground,
            secondaryBackground,
            tertiaryBackground,
        } = req.body

        if (/\S/.test(background)) {
            console.log('Background Updated')
            updatedUser = await User.findByIdAndUpdate(req.user.id, {
                backgroundPicture: background,
            })
        }
        if (/\S/.test(primaryHeader)) {
            console.log('Primary Header Updated')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.primaryHeader': primaryHeader },
                }
            )
        }
        if (/\S/.test(secondaryHeader)) {
            console.log('Secondary Header Updated')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.secondaryHeader': secondaryHeader },
                }
            )
        }
        if (/\S/.test(tertiaryHeader)) {
            console.log('Tertiary Header Updated')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.tertiaryHeader': tertiaryHeader },
                }
            )
        }
        if (/\S/.test(outLine)) {
            console.log('Outline Updated')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.outLine': outLine },
                }
            )
        }
        if (/\S/.test(secondaryOutline)) {
            console.log('Secondary Outline Updated')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.secondaryOutline': secondaryOutline },
                }
            )
        }
        if (/\S/.test(activeOutline)) {
            console.log('Active Outline Updated')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.activeOutline': activeOutline },
                }
            )
        }
        if (/\S/.test(primaryBackground)) {
            console.log('Primary Background Uploaded')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.primaryBackground': primaryBackground },
                }
            )
        }
        if (/\S/.test(secondaryBackground)) {
            console.log('secondaryBackground Uploaded')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.secondaryBackground': secondaryBackground },
                }
            )
        }
        if (/\S/.test(tertiaryBackground)) {
            console.log('Tertiary Background Uploaded')
            updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { 'colorScheme.tertiaryBackground': tertiaryBackground },
                }
            )
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
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { joinedServers: req.params.id },
        })
        await Server.findByIdAndUpdate(req.params.id, {
            $addToSet: { userList: req.user.id },
        })
        res.json(await User.findById(req.user.id).select('-password'))
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

router.put('/sendcomment/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        let updatedComments = await User.findByIdAndUpdate(req.params.id, {
            $addToSet: { profileComments: req.body },
        })
        res.json('updated')
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//GET A PROFILE
router.get('/profile/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        const profile = await User.findById(req.params.id)

        const { name, backgroundPicture, profilePicture, profileBanner, screenShots, _id, onlineStatus, location, bio, profileLevel, profileComments } = profile

        const profileInfo = {
            _id: _id,
            name: name,
            backgroundPicture: backgroundPicture,
            profilePicture: profilePicture,
            profileBanner: profileBanner,
            screenShots: screenShots,
            onlineStatus: onlineStatus,
            location: location,
            bio: bio,
            profileLevel: profileLevel,
            profileComments: profileComments,
        }

        res.json(profileInfo)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
