import express from 'express'
import { fileController } from '../../controllers'
import { fileConfig } from '../../middleware/configFile'
const upload = fileConfig.upload

export const router = express.Router({
  strict: true
})

router.post('/', upload.array('upload',50) ,(req, res, next) => {
  fileController.create(req, res, next)
})

router.get('/all', (req, res, next) => {
  fileController.findAll(req, res, next)
})

router.get('/:filename', (req, res, next) => {
  fileController.read(req, res, next)
})

router.get('/multiple/Files', (req, res, next) => {
  fileController.findAllFilesInArray(req, res, next)
})

router.delete('/:id', (req, res, next) => {
  fileController.deleteFile(req, res, next)
})
