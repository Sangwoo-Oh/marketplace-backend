const dotenv = require('dotenv')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const InitDb = require('./init-db')

//dotenv
dotenv.config()

//mongoose connection
mongoose.connect('mongodb+srv://'+ process.env.USERNAME +':' + process.env.PASSWORD + '@' + process.env.URI).then(()=> {
    const initDb = new InitDb();
    initDb.initDb();
}).catch((err) => {
    console.log(err)
})


const port = process.env.PORT | 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
