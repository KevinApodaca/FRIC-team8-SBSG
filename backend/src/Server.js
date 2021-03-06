import { PORT } from './config/constants'
import { eventRouter } from './routes'
import { systemRouter } from './routes'
import { taskRouter } from './routes'
import { subtaskRouter } from './routes'
import { transactionRouter } from './routes'
import { findingRouter } from './routes'
import { analystRouter } from './routes'
import { fileRouter } from './routes'

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const chalk = require("chalk")


app.use(express.json())
app.use(bodyParser.json({ limit: '500mb', extended: true }))

/*
  Grab the analyst IP address.
  Potentially add this to the analyst object and send it to frontend as response.
*/
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log(chalk.blue('🐱‍💻 Analyst IP address: ' + add));
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
app.use('/findings',findingRouter)
app.use('/analysts',analystRouter)
app.use('/files',fileRouter)


const db = require('./models')
db.mongoose
  .connect(db.url, {useUnifiedTopology: true, useNewUrlParser: true,})
  .then(() => {
    console.log(chalk.green('🗃️ Connected to the database!'))
  })
  .catch(err => {
    console.log(chalk.red('⭕ Cannot connect to the database!', err))
    process.exit()
  })
app.listen(PORT, () => {
  console.log(chalk.magenta(`🚀 Server is listening on port ${PORT}`))
})
