const express = require('express')
const creds = require('./creds')
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

// Connects practice router to main app
const practiceRouter = require('./routes/practice')
app.use('/practice', practiceRouter)

// Connects blog router to main app
const blogRouter = require('./routes/blog')
app.use('/blog', blogRouter)