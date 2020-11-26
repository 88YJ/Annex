const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const DirectMessages = require('../models/DirectMessage')
const MessageContainer = require('../models/MessageContainer')

//get inbox
router.get('/inbox/:profile_id', middleware.isAuthenticated, async (req, res) => {
    try {
        const userToGrab = await User.findById(req.params.profile_id)
        const messages = await DirectMessages.findById(userToGrab.directMessages)

        res.json(messages)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//get direct chats
router.get('/:profile_id', middleware.isAuthenticated, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const userToUpdate = await User.findById(req.user.id)
        const SecondUserToUpdate = await User.findById(req.params.profile_id)
        let profileInfo
        let secondProfileInfo
        // if (!userToUpdate.directMessages) {
        //     const DirectMessageToAdd = new DirectMessages({
        //         owner: req.user.id,
        //     })

        //     const savedDirectMessage = await DirectMessageToAdd.save()

        //     await User.findByIdAndUpdate(req.user.id, {
        //         $push: { directMessages: savedDirectMessage._id },
        //     })
        // } else if (!SecondUserToUpdate.directMessages) {
        //     const DirectMessageToAdd = new DirectMessages({
        //         owner: req.params.profile_id,
        //     })

        //     const savedDirectMessage = await DirectMessageToAdd.save()

        //     await User.findByIdAndUpdate(req.params.profile_id, {
        //         $push: { directMessages: savedDirectMessage._id },
        //     })
        // }

        const userToUpdateDirect = await DirectMessages.findById(userToUpdate.directMessages)
        const result = userToUpdateDirect.messages.filter((item) => item.otherUserID == req.params.profile_id)
        const secondUserToUpdateDirect = await DirectMessages.findById(SecondUserToUpdate.directMessages)
        const secondresult = secondUserToUpdateDirect.messages.filter((item) => item.otherUserID == req.user.id)

        if (!result[0] || !secondresult[0]) {
            console.log('added to users')
            const MessageContainerToAdd = new MessageContainer({ owners: [req.user.id, req.params.profile_id] })

            const savedMessage = await MessageContainerToAdd.save()

            if (userToUpdate) {
                const { name, backgroundPicture, profilePicture, profileBanner, _id } = userToUpdate
                profileInfo = {
                    _id: _id,
                    name: name,
                    backgroundPicture: backgroundPicture,
                    profilePicture: profilePicture,
                    profileBanner: profileBanner,
                }
            }
            if (SecondUserToUpdate) {
                const { name, backgroundPicture, profilePicture, profileBanner, _id } = SecondUserToUpdate
                secondProfileInfo = {
                    _id: _id,
                    name: name,
                    backgroundPicture: backgroundPicture,
                    profilePicture: profilePicture,
                    profileBanner: profileBanner,
                }
            }

            const messageContainer1 = {
                user: secondProfileInfo,
                otherUserID: req.params.profile_id,
                message: savedMessage._id,
                read: false,
            }
            const messageContainer2 = {
                user: profileInfo,
                otherUserID: req.user.id,
                message: savedMessage._id,
                read: false,
            }

            await DirectMessages.findByIdAndUpdate(userToUpdate.directMessages, {
                $addToSet: { messages: messageContainer1 },
            })
            await DirectMessages.findByIdAndUpdate(SecondUserToUpdate.directMessages, {
                $addToSet: { messages: messageContainer2 },
            })
        }
        if (result[0] && result[0].message !== undefined) {
            const response = await MessageContainer.findById(result[0].message)

            await DirectMessages.findOneAndUpdate(
                { _id: userToUpdate.directMessages },
                {
                    $set: { 'messages.$[elem].read': true },
                },
                { arrayFilters: [{ 'elem.message': result[0].message }] }
            )

            res.json(response.messages)
        } else {
            res.json('error')
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
