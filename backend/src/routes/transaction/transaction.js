import express from 'express'
import { transactionController } from '../../controllers'

// TODO: define specific endpoint for systems here
export const router = express.Router({
  strict: true
})

router.post('/', (req, res) => {
  transactionController.create(req, res)
})

router.get('/all', (req, res) => {
  transactionController.findAllTransactions(req, res)
})

router.get('/:systemId', (req, res) => {
  transactionController.read(req, res)
})

router.patch('/:systemId', (req, res) => {
  transactionController.update(req, res)
})

router.delete('/:systemId', (req, res) => {
  transactionController.delete(req, res)
})
