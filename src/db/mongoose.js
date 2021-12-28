const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_DB_URI

mongoose.connect(uri, {
    useNewUrlParser: true
})