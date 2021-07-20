const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.json())

const meals = require('./routes/meals')
const orders = require('./routes/orders')
const auth = require('./routes/auth')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, })

app.use('/meals', meals)
app.use('/orders', orders)
app.use('/auth', auth)

app.listen(port, () => {
    console.log("servidor conectado")
})

module.exports = app