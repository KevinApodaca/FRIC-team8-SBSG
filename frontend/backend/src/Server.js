import { PORT } from './config/constants'
import { eventRouter } from './routes'
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '500mb', extended: true }))

app.use('/event', eventRouter)

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
