const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Server = require('../models/Server')

let createServerCheck = [middleware.isAuthenticated, [check('name', 'Name is required').not().isEmpty()]]

//Get all servers
router.get('/', middleware.isAuthenticated, async (req, res) => {
    try {
        const allServers = await Server.find()
        res.json(allServers)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Failed to get all servers.')
    }
})

router.post('/', createServerCheck, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, img } = req.body

    try {
        const newServer = new Server({
            name,
            img,
            userList: [req.user.id],
            owner: req.user.id,
        })

        const server = await newServer.save()
        res.json(server)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Failed to create new server.')
    }
})

router.get('/joinedservers', middleware.isAuthenticated, async (req, res) => {
    try {
        const { joinedServers } = await User.findById(req.user.id).select('joinedServers')

        let servers = []
        for (const id of joinedServers) {
            servers.push(await Server.findById(id))
        }

        res.json(servers)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Failed to get all joined servers')
    }
})

//Get server users
router.get('/:id/users', middleware.isAuthenticated, async (req, res) => {
    try {
        const { userList } = await Server.findById(req.params.id, 'userList')

        let users = []
        for (const id of userList) {
            const user = await User.findById(id)
            const userInfoObject = {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                profileBanner: user.profileBanner,
                screenShots: user.screenShots,
                _id: user._id,
                onlineStatus: user.onlineStatus,
            }
            users.push(userInfoObject)
        }

        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//Update user list
router.put('/:id/adduser', middleware.isAuthenticated, async (req, res) => {
    try {
        let updatedServer = await Server.findByIdAndUpdate(req.params.id, {
            $addToSet: { userList: req.user.id },
        })

        res.json(updatedServer)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//Edit Server

router.put('/editserver/:id', middleware.isAuthenticated, async (req, res) => {
    console.log('edit in pros')
    try {
        const { name, img } = req.body
        if (/\S/.test(name)) {
            console.log('Server Name Updated')
            await Server.findByIdAndUpdate(req.params.id, {
                name: name,
            })
        }
        if (/\S/.test(img)) {
            console.log('Server Background Updated')
            await Server.findByIdAndUpdate(req.params.id, {
                img: img,
            })
        }
        const updatedserver = await Server.findById(req.params.id)

        res.json(updatedserver)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Err')
    }
})

//Get A Server
router.get('/server/:id', middleware.isAuthenticated, async (req, res) => {
    try {
        const server = await Server.findById(req.params.id)

        res.json(server)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
