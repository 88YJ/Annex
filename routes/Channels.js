const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const { check, validationResult } = require('express-validator')

const Server = require('../models/Server')
const Channel = require('../models/Channel')

const createChannelCheck = [middleware.isAuthenticated, [check('name', 'Name is required').not().isEmpty()]]

//Get all channels
router.get('/:channel_ids', middleware.isAuthenticated, async (req, res) => {
    try {
        const channelIds = await JSON.parse(req.params.channel_ids)
        let channels = []

        for (const id of channelIds) {
            channels.push(await Channel.findById(id))
        }

        res.json(channels)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.get('/messages/:channel_id', middleware.isAuthenticated, async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channel_id)
        res.json(channel)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//Post a new channel to the current server
router.post('/', createChannelCheck, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, voiceChannel, owner } = req.body

    try {
        const channelToAdd = new Channel({
            name,
            voiceChannel,
            owner: owner,
        })

        const savedChannel = await channelToAdd.save()

        const updatedServer = await Server.findByIdAndUpdate(req.params.server_id, {
            $addToSet: { channelList: savedChannel._id },
        })

        res.json(updatedServer)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
