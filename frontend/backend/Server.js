/* Mongoose Connection */
// const mongoose = require('mongoose')
// const url = 'mongodb://127.0.0.1:27017/fric-events-db'
// mongoose.connect(url, { useNewUrlParser: true })
// const db = mongoose.connection
// db.once('open', _ => {
//     console.log('Connection Succesfully Established:', url)
// })
// db.on('error', err => [
//     console.error('connection error:', err)
// ])

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    events = require('./models/eventListModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Eventdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/eventListRoute');
routes(app);

app.listen(port);

console.log('user List started on:' + port);
