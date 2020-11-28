require('dotenv').config()
require("./connect-mongodb")
const express = require('express')
const bodyParser = require("body-parser")
const path = require("path")
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
var publicPath = path.resolve(__dirname, 'dist')
app.use(express.static(publicPath))

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_COOKIE,
    cookie: {
        maxAge: 24 * 60 * 1000,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use((err, req, res, next) => {
    res.status(500)
        .json({
            message: err.message,
            stack: err.stack
        })
})

app.use(routes)

app.listen(PORT, (err) => {
    err
        ? console.error(err.message)
        : console.log(`Server listening on port ${PORT}`)
})