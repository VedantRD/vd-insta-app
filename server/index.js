const express = require('express')
require('dotenv').config({ path: './config.env' })
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Models
require('./models/user')
require('./models/post')

// Middlewares
app.use(bodyParser.json())

// Routes
app.use(require('./routes/authRoutes'))
app.use(require('./routes/userRoutes'))
app.use(require('./routes/postRoutes'))

// Connect DB
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
mongoose.connect(process.env.MONGODB_URI, dbOptions, (err) => {
    if (err) {
        return console.error('Something went wrong')
    }
    console.log('DB connection Successful')
})

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT)
})