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

router.get('/multiple/tasks', (req, res) => {
  taskController.findAllTasksInArray(req, res)
})

router.get('/:taskId', (req, res) => {
    taskController.read(req, res)
})

router.patch('/:taskId', (req, res) => {
    taskController.update(req, res)
})

router.patch('/addItem/:taskId', (req, res) => {
    taskController.updateArray(req, res)
})

router.patch('/removeItem/:taskId', (req, res) => {
    taskController.removeItem(req, res)
})

router.patch('/all/parents/:parentId', (req, res) => {
    taskController.changeParent(req, res)
})

router.patch('/all/instancesOfId/', (req, res) => {
    taskController.removeInstancesOfId(req, res)
})

router.delete('/:taskId', (req, res) => {
    taskController.delete(req, res)
})
