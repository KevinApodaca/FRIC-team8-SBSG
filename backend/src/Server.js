import { PORT } from './config/constants'
import { eventRouter } from './routes'
import { systemRouter } from './routes'
import { taskRouter } from './routes'
import { subtaskRouter } from './routes'
import { transactionRouter } from './routes'
import { homeRouter } from './routes'
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '500mb', extended: true }))

/* 
  Grab the analyst IP address.
  Potentially add this to the analyst object and send it to frontend as response.
*/
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log("Analyst IP address: " + add);
})
/*
  Handles CORS
  Might need to come back
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accepted, Authorization');
    if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});

app.use('/events', eventRouter)
app.use('/systems', systemRouter)
app.use('/tasks', taskRouter)
app.use('/subtasks', subtaskRouter)
app.use('/transactions',transactionRouter)
app.use('/', homeRouter)

const db = require('./models')
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
