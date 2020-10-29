import { dbConfig } from '../config/constants'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.events = require('./event.js')(mongoose)
db.systems = require('./system.js')(mongoose)
db.tasks = require('./task.js')(mongoose)
db.subtasks = require('./subtask.js')(mongoose)
db.transaction = require('./transactions.js')(mongoose)
db.analyst = require('./analyst.js')(mongoose)

module.exports = db
