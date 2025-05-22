const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

//view the blogs
router.get('/', (req, res) => {
    Blog.find()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/add', (req, res) => {
    const blog = new Blog({
        title: 'Hello World 2',
        body: 'hello everyone! this is my first thing in mongoDB'
    })
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/create', (req, res) => {
    res.render('create-blog')
})

router.post('/create', (req, res, next) => {
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/')
    next()
})

module.exports = router