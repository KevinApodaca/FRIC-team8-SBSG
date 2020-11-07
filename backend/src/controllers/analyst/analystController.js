const db = require('../../models')
var mongoose = require('mongoose');
const Analyst = db.analyst

export class AnalystController {
  create (req, res) {
    const analyst = new Analyst(req.body)
    analyst
      .save(analyst)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the Analyst.'
        })
      })
  }

  read (req, res) {
    const id = req.params.analystId
    Analyst.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found Analyst with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving Analyst with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.analystId

    Analyst.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Analyst with id=${id}!`
          })
        } else res.send({ message: 'Analyst was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Analyst with id=' + id + err.message
        })
      })
  }

  delete (req, res) {
    const id = req.params.analystId

    Analyst.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Analyst with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'Analyst was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete Analyst with id=' + id + err.message
        })
      })
  }

  findAllAnalysts (req, res) {
    Analyst.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving Analysts.'
        })
      })
  }

  findAllAnalystInArray (req, res) {
    const listOfAnalyst = req.query.arr
    const ids = listOfAnalyst.map(id => mongoose.Types.ObjectId(id.toString()))

    Analyst.find({ _id : { $in : ids }})
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message + listOfAnalyst || 'Some error occurred while retrieving Analysts.' + listOfAnalyst
      })
    })
  }
}
