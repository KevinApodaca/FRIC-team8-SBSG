/*
  Have to comback and fix this mess
*/

import express from 'express'
import { fileController } from '../../controllers'
const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs');
const Grid = require('gridfs-stream')
const path = require('path')
const db = require('../../models')
const File = db.file
const conn = db.mongoose.createConnection(db.url)
let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, db.mongoose.mongo)
  gfs.collection('uploads')
})

const storage = new GridFsStorage({
  url: db.url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          actualFileName: file.originalname,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage: storage });


export const router = express.Router({
  strict: true
})

router.post('/', upload.array('upload',10) ,(req, res) => {
  return res.status(200).json({file: req.files})
})

router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //Checks if files exits
    if (!files || files.length === 0){
      return res.status(404).json({err: 'No files exist'})
    }

    // Files exists
    return res.json(files)
  })
})

router.get('/:filename', (req, res) => {
  console.log('hello again')
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    //Checks if files exits
    if (!file || file.length === 0){
      return res.status(404).json({err: 'No file exist'})
    }

    // Files exists
    return res.status(200).json(file)
  })
})

router.get('/multiple/Files', (req, res) => {
  gfs.files.find({ filename: { $in: req.query.arr }}).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({err: 'No files exist'})
    }

    return res.json(files)
  })
})

router.delete('/:id', (req, res) => {
  gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore) => {
    if (err) {
      return res.status(404).json({err: err})
    }

    return res.json({message: 'File Deleted'})
  })
})
