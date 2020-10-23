import express from 'express'
import { taskController } from '../../controllers'

// TODO: define specific endpoint for tasks here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
    taskController.create(req, res)
})

router.get('/all', (req, res) => {
    taskController.findAllTasks(req, res)
})

router.get('/:taskId', (req, res) => {
    taskController.read(req, res)
})

router.patch('/:taskId', (req, res) => {
    taskController.update(req, res)
})

router.delete('/:taskId', (req, res) => {
    taskController.delete(req, res)
})
