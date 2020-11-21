import express from 'express'
import { systemController } from '../../controllers'

// TODO: define specific endpoint for systems here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
  systemController.create(req, res)
})

router.get('/all', (req, res) => {
  systemController.findAllSystems(req, res)
})

router.get('/multiple/systems', (req, res) => {
  systemController.findAllSystemsInArray(req, res)
})

router.get('/:systemId', (req, res) => {
  systemController.read(req, res)
})

router.patch('/:systemId', (req, res) => {
  systemController.update(req, res)
})

router.patch('/task/:systemId', (req, res) => {
  systemController.updateArrayTask(req, res)
})

router.patch('/finding/:systemId', (req, res) => {
  systemController.updateArrayFinding(req, res)
})

router.patch('/remove/task/:systemId', (req, res) => {
  systemController.removeTask(req, res)
})

router.patch('/remove/finding/:systemId', (req, res) => {
  systemController.removeFinding(req, res)
})

router.delete('/:systemId', (req, res) => {
  systemController.delete(req, res)
})
