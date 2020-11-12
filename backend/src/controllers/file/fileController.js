const db = require('../../models')
const fs = require('fs');
const Grid = require('gridfs-stream')
const File = db.file
const conn = db.mongoose.createConnection(db.url)
let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, db.mongoose.mongo)
  gfs.collection('uploads')
})

export class FileController {
  create (req, res) {
    let {
      file
    } = req.files;

    let writeStream = gfs.createWriteStream({
      filename: `${file.name}`,
      mode: 'w',
      content_type: file.mimetype
    })

    writeStream.on('close', function (uploadedFile) {
      const file = new File(uploadedFile)
      file
        .save(file)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
            err.message || 'Some error occurred while creating the File.'
          })
        })
    })

    writeStream.write(file.data)
    writeStream.end()
  }
}
