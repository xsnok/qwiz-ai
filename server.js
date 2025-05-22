const express = require("express")
const creds = require('./creds')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(creds.mongoAPI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.use((req, res, next) => {
    console.log('this is middle-ware')
    next()
})

app.get('/', (req,res) => {
    res.setHeader('Content-Type', 'text/html')
    const title = "blud"
    res.render('index', {title})
})

//view the blogs
app.get('/blog', (req, res) => {
    Blog.find()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blog/add', (req, res) => {
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

app.get('/blog/create', (req, res) => {
    res.render('create-blog')
})

app.post('/blog/create', (req, res, next) => {
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/blog')
    next()
})