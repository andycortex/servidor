const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000

const meals = require('./routes/meals')
const orders = require('./routes/orders')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/meals', meals)
app.use('/orders', orders)

app.listen(port, () => {
    console.log("servidor conectado")
})

module.exports = app