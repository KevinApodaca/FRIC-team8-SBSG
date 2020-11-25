import express from 'express'
import { eventController } from '../../controllers'

// TODO: define specific endpoint for events here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
  eventController.create(req, res)
})

router.get('/all', (req, res) => {
  eventController.findAllEvents(req, res)
})

router.get('/:eventId', (req, res) => {
  eventController.read(req, res)
})

router.patch('/:eventId', (req, res) => {
  eventController.update(req, res)
})

router.patch('/addItem/:eventId', (req, res) => {
  eventController.updateArray(req, res)
})

router.patch('/removeItem/:eventId', (req, res) => {
  eventController.removeItemInArray(req, res)
})

router.delete('/:eventId', (req, res) => {
  eventController.delete(req, res)
})
