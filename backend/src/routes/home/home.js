import express from 'express'
var os = require('os')

export const router = express.Router({
    strict: true
})
/* TODO */
  router.get('/home', (req, res) => {
      console.log('helo')
    console.log(JSON.stringify(os.networkInterfaces()["en1"][1]["address"], null, 2))
  })