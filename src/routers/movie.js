const express = require('express')
const Movie = require('../models/movie')
const authentication = require('../middleware/authentication')
const router = new express.Router()
const _ = require('lodash')
const NodeCache = require("node-cache");
const internalCache = new NodeCache();

router.post('/movies', authentication, async (req, res) => {
    const movie = new Movie({
        ...req.body,
        created_by: req.user._id
    })

    try {
        await movie.save()
        res.status(201).send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/movieRating', authentication, async (req, res) => {
    try {
        const movieQuery = {
            'title': req.body.title,
            'language': req.body.language,
            'released_on': req.body.released_on,
        }
        const movie = await Movie.findOne(movieQuery)
        let exists = false
        _.each(movie.ratings, (rating) => {
            if (_.get(rating, 'user_id') === req.user.user_id) {
                rating['rating'] = req.body.rating
                exists = true
            }
        })
        if (!exists) {
            const ratingObj = {
                user_id: req.user.user_id,
                rating: req.body.rating,
                rated_on: new Date()
            }
            movie.ratings = movie.ratings.concat(ratingObj)
        }
        let count = 0
        let sum = 0
        _.each(movie.ratings, (rating) => {
            count += 1
            sum += rating['rating']
        })
        movie.average_rating = Math.round(sum / count, 2)
        await movie.save()
        res.status(201).send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/movieRatings', authentication, async (req, res) => {
    try {
        const limit = +_.get(req, ['query', 'limit'], 10)
        const skip = +_.get(req, ['query', 'skip'], 0)
        const key = "movie_reatings_" + limit + "_" + skip
        var cacheResponse = internalCache.get(key);
        if (cacheResponse == undefined) {
            cacheResponse = await Movie.find()
                .select('title genre description released_on average_rating')
                .limit(limit)
                .skip(skip)
            internalCache.set(key, cacheResponse, 120);
        }
        res.send(cacheResponse)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/movies/:id', authentication, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'genre']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const movie = await Movie.findOne({ _id: req.params.id, created_by: req.user._id })

        if (!movie) {
            return res.status(404).send()
        }

        updates.forEach((update) => movie[update] = req.body[update])
        await movie.save()
        res.send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/movies/:id', authentication, async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id, created_by: req.user._id })

        if (!movie) {
            res.status(404).send()
        }

        res.send(movie)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router