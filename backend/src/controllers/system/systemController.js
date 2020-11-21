const db = require('../../models')
const System = db.systems

export class SystemController {
  create (req, res) {
    const system = new System(req.body)
    system
      .save(system)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the System.'
        })
      })
  }

  read (req, res) {
    const id = req.params.systemId
    System.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found System with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving System with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.systemId

    System.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update System with id=${id}!`
          })
        } else res.send({ message: 'System was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating System with id=' + id + err.message
        })
      })
  }

  updateArrayTask (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.systemId

    System.findByIdAndUpdate(id, {$push: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update System with id=${id}!`
          })
        } else res.send({ message: 'System was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating System with id=' + id + " " + err.message
        })
      })
  }

  updateArrayFinding (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.systemId

    System.findByIdAndUpdate(id, {$push: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update System with id=${id}!`
          })
        } else res.send({ message: 'System was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating System with id=' + id + " " + err.message
        })
      })
  }

  removeTask (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.systemId

    System.findByIdAndUpdate(id, {$pull: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update System with id=${id}!`
          })
        } else res.send({ message: 'System was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating System with id=' + id + " " + err.message
        })
      })
  }

  removeFinding (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.systemId

    System.findByIdAndUpdate(id, {$pull: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update System with id=${id}!`
          })
        } else res.send({ message: 'System was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating System with id=' + id + " " + err.message
        })
      })
  }

  delete (req, res) {
    const id = req.params.systemId

    System.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete System with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'System was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete System with id=' + id + err.message
        })
      })
  }

  findAllSystems (req, res) {
    System.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving Systems.'
        })
      })
  }

  findAllSystemsInArray (req, res) {
    const listOfSystems = req.query.arr
    const ids = listOfSystems.map(id => mongoose.Types.ObjectId(id.toString()))

    System.find({ _id : { $in : ids }})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Systems.'
      })
    })
  }
}
