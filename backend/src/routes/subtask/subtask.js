import express from 'express'
import { subtaskController } from '../../controllers'

// TODO: define specific endpoint for subtasks here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
    subtaskController.create(req, res)
})

router.get('/all', (req, res) => {
    subtaskController.findAllSubtasks(req, res)
})

router.get('/:subtaskId', (req, res) => {
    subtaskController.read(req, res)
})

router.patch('/:subtaskId', (req, res) => {
    subtaskController.update(req, res)
})

router.delete('/:subtaskId', (req, res) => {
    subtaskController.delete(req, res)
})
