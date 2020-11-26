import { fileConfig } from '../../middleware/configFile'
const conn = fileConfig.conn
const Grid = require('gridfs-stream')
const db = require('../../models')
let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, db.mongoose.mongo)
  gfs.collection('uploads')
})

export class FileController {
  create (req, res, next) {
    try {
      res.status(200).send({file: req.files})
    } catch (e) {
      res.status(500).send({message: 'Something went wrong :( ' + e})

    }
  }

  read (req, res, next) {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      //Checks if files exits
      if (!file || file.length === 0){
        res.status(404).send({err: 'No file exist'})
      } else {
        // Files exists
        res.status(200).send(file)
      }
    })
  }

  findAll (req, res, next) {
    gfs.files.find().toArray((err, files) => {
      //Checks if files exits
      if (!files || files.length === 0){
        res.status(404).send({err: 'No files exist'})
      } else {
        // Files exists
        res.send(files)
      }
    })
  }

  findAllFilesInArray (req, res, next) {
    gfs.files.find({ filename: { $in: req.query.arr }}).toArray((err, files) => {
      if (!files || files.length === 0) {
        res.status(404).send({err: 'No files exist'})
      } else {
        res.send(files)
      }
    })
  }

  deleteFile (req, res, next) {
    gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore) => {
      if (err) {
        res.status(404).send({err: err})
      } else {
        res.send({message: 'File Deleted'})
      }
    })
  }
}
