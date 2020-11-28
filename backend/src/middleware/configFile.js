const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs');
const Grid = require('gridfs-stream')
const path = require('path')
const db = require('../models')
const conn = db.mongoose.createConnection(db.url)

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
})

const upload = multer({ storage: storage })

export const fileConfig = {
  upload: upload,
  conn: conn
}
