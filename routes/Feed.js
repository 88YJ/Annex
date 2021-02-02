const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
//const { check, validationResult } = require('express-validator')

const Posts = require('../models/Posts')

//Get all channels
router.get('/', middleware.isAuthenticated, async (req, res) => {
    try {
        const allPosts = await Posts.find()
        res.json(allPosts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.post('/', middleware.isAuthenticated, async (req, res) => {
    const { name, img, message, profilePicture } = req.body

    try {
        const newPost = new Posts({
            name,
            img,
            message,
            profilePicture,
        })

        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Failed to create new server.')
    }
})

module.exports = router
