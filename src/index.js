require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const movieRouter = require('./routers/movie')

const app = express()

const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(movieRouter)

app.listen(port, () => {
    console.log('Applications started successfully on PORT :: ',port)
})
