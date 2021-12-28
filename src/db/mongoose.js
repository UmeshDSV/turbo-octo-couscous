const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:admin@cluster0.grhoq.mongodb.net/IMDB?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true
})