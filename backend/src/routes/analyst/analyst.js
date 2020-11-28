import express from 'express'
import { analystController } from '../../controllers'

export const router = express.Router({
  strict: true
})

router.post('/', (req, res, next) => {
  analystController.create(req, res, next)
})

router.get('/all', (req, res, next) => {
  analystController.findAllAnalysts(req, res, next)
})

router.get('/listOfAnalyst', (req, res, next) => {
  analystController.findAllAnalystInArray(req, res, next)
})

router.get('/:analystId', (req, res, next) => {
  analystController.read(req, res, next)
})

router.patch('/:analystId', (req, res, next) => {
  analystController.update(req, res, next)
})

router.delete('/:analystId', (req, res, next) => {
  analystController.delete(req, res, next)
})
