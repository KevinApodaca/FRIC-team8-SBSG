import express from 'express'
import { analystController } from '../../controllers'

export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
  analystController.create(req, res)
})

router.get('/all', (req, res) => {
  analystController.findAllAnalysts(req, res)
})

router.get('/listOfAnalyst', (req, res) => {
  analystController.findAllAnalystInArray(req, res)
})

router.get('/:analystId', (req, res) => {
  analystController.read(req, res)
})

router.patch('/:analystId', (req, res) => {
  analystController.update(req, res)
})

router.delete('/:analystId', (req, res) => {
  analystController.delete(req, res)
})
