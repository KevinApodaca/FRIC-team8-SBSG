import express from 'express'
import { eventController } from '../../controllers'

// TODO: define specific endpoint for events here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res, next) => {
  eventController.create(req, res, next)
})

router.get('/all', (req, res, next) => {
  eventController.findAllEvents(req, res, next)
})

router.get('/:eventId', (req, res, next) => {
  eventController.read(req, res)
})

router.patch('/:eventId', (req, res, next) => {
  eventController.update(req, res)
})

router.patch('/addItem/:eventId', (req, res, next) => {
  eventController.updateArray(req, res)
})

router.patch('/removeItem/:eventId', (req, res, next) => {
  eventController.removeItemInArray(req, res)
})

router.delete('/:eventId', (req, res, next) => {
  eventController.delete(req, res)
})
