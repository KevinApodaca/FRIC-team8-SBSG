const db = require('../../models')
const Subtask = db.subtasks

export class SubtaskController {
  create (req, res) {
    const subtask = new Subtask(req.body)
    subtask
      .save(subtask)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the Subtask.'
        })
      })
  }

  read (req, res) {
    const id = req.params.subtaskId
    Subtask.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found Subask with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving Subtask with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.subtaskId

    Subtask.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update subtask with id=${id}!`
          })
        } else res.send({ message: 'Subtask was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating subtask with id=' + id + err.message
        })
      })
  }

  delete (req, res) {
    const id = req.params.subtaskId

    Subtask.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Subtask with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'Subtask was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete Subtask with id=' + id + err.message
        })
      })
  }

  findAllSubtasks (req, res) {
    Subtask.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving Subtasks.'
        })
      })
  }
}
