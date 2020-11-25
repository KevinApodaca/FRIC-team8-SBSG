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

router.patch('/addItem/:systemId', (req, res) => {
  systemController.updateArray(req, res)
})

router.patch('/removeItem/:systemId', (req, res) => {
  systemController.removeItemInArray(req, res)
})

router.delete('/:systemId', (req, res) => {
  systemController.delete(req, res)
})
