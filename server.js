const express = require("express")
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.listen(3000)

app.use(express.static('public'))
app.use((req, res, next) => {
    console.log('this is middle-ware')
    next()
})

app.get('/', (req,res) => {
    res.setHeader('Content-Type', 'text/html')
    const title = "blud"
    res.render('index', {title})
})