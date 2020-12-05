const db = require('../../models')
const Task = db.tasks

export class TaskController {
  create (req, res) {
    const task = new Task(req.body)
    task
      .save(task)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the Task.'
        })
      })
  }

  read (req, res) {
    const id = req.params.taskId
    Task.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found Task with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving Task with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.taskId

    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update task with id=${id}!`
          })
        } else res.send({ message: 'Task was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating task with id=' + id + err.message
        })
      })
  }

  updateArray (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.taskId

    Task.findByIdAndUpdate(id, {$push: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update task with id=${id}!`
          })
        } else res.send({ message: 'Task was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating task with id=' + id + ' ' + err.message
        })
      })
  }

  removeItem (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.taskId

    Task.findByIdAndUpdate(id, {$pull: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update task with id=${id}!`
          })
        } else res.send({ message: 'Task was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating task with id=' + id + ' ' + err.message
        })
      })
  }

  changeParent (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.parentId

    Task.updateMany({parent: id}, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update task with id=${id}!`
          })
        } else res.send({ message: 'Task was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating task with id=' + id + ' ' + err.message
        })
      })
  }

  removeInstancesOfId (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    Task.updateMany({}, {$pull: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update task with id=${id}!`
          })
        } else res.send({ message: 'Task was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating task with id=' + id + ' ' + err.message
        })
      })
  }

  delete (req, res) {
    const id = req.params.taskId

    Task.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Task with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'Task was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete Task with id=' + id + err.message
        })
      })
  }

  findAllTasks (req, res) {
    Task.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving Tasks.'
        })
      })
  }

  findAllTasksInArray (req, res) {
    const listOfTasks = req.query.arr
    const ids = listOfTasks.map(id => mongoose.Types.ObjectId(id.toString()))

    Tasks.find({ _id : { $in : ids }})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Tasks.'
      })
    })
  }
}
