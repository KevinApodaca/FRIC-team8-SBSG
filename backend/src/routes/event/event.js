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

router.patch('/system/:eventId', (req, res) => {
  eventController.updateArraySystem(req, res)
})

router.patch('/analyst/:eventId', (req, res) => {
  eventController.updateArrayAnalyst(req, res)
})

router.patch('/remove/system/:eventId', (req, res) => {
  eventController.removeSystem(req, res)
})

router.patch('/remove/analyst/:eventId', (req, res) => {
  eventController.removeAnalyst(req, res)
})

router.delete('/:eventId', (req, res) => {
  eventController.delete(req, res)
})
