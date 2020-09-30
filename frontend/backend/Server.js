// /* Mongoose Connection */
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

var url = 'mongodb://localhost/Eventdb'
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers',"Content-Type, Access, Authorization");
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

var routes = require('./routes/eventListRoute');
routes(app);

app.listen(port);

console.log('user List started on:' + port);
