/* Mongoose Connection */
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/fric-events-db'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
    console.log('Connection Succesfully Established:', url)
})
db.on('error', err => [
    console.error('connection error:', err)
])