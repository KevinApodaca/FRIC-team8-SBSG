import express from 'express'
import { findingController } from '../../controllers'

// TODO: define specific endpoint for events here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
  findingController.create(req, res)
})

router.get('/all', (req, res) => {
  findingController.findAllFindings(req, res)
})

router.get('/multiple/findings', (req, res) => {
  findingController.findAllFindingsInArray(req, res)
})

router.get('/:findingId', (req, res) => {
  findingController.read(req, res)
})

router.patch('/:findingId', (req, res) => {
  findingController.update(req, res)
})

router.patch('/all/parents/:parentId', (req, res) => {
  findingController.changeParent(req, res)
})

router.delete('/:findingId', (req, res) => {
  findingController.delete(req, res)
})
