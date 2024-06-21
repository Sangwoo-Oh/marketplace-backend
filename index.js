const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const InitDb = require('./init-db')
const itemRoutes = require('./routes/items');
const cors = require('cors')

const app = express()

//dotenv
dotenv.config()

//mongoose connection
mongoose.connect('mongodb+srv://'+ process.env.USERNAME +':' + process.env.PASSWORD + '@' + process.env.URI).then(()=> {
    //init database
    const initDb = new InitDb()
    initDb.initDb()
}).catch((err) => {
    console.log(err)
})

app.use(cors())

//routing config
app.use('/api/v1/items', itemRoutes);

const port = process.env.PORT ||  3000
app.listen(port, () => {
    console.log('listening on port ' + port)
})
