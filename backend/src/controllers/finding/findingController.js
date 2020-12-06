const db = require('../../models')
const Finding = db.findings

export class FindingController {
  create (req, res) {
    const finding = new Finding(req.body)
    finding
      .save(finding)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the Finding.'
        })
      })
  }

  read (req, res) {
    const id = req.params.findingId
    Finding.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found Finding with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving Finding with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.findingId

    Finding.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Finding with id=${id}!`
          })
        } else res.send({ message: 'Finding was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Finding with id=' + id + err.message
        })
      })
  }

  updateArray (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.findingId

    Finding.findByIdAndUpdate(id, {$push: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Finding with id=${id}!`
          })
        } else res.send({ message: 'Finding was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Finding with id=' + id + err.message
        })
      })
  }

  removeItem (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.findingId

    Finding.findByIdAndUpdate(id, {$pull: req.body}, { useFindAndModify: false })
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


  changeParent (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.parentId

    Finding.updateMany({parent: id}, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Finding with id=${id}!`
          })
        } else res.send({ message: 'Finding was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Finding with id=' + id + ' ' + err.message
        })
      })
  }

  delete (req, res) {
    const id = req.params.findingId

    Finding.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Finding with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'Finding was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete Finding with id=' + id + err.message
        })
      })
  }

  findAllFindings (req, res) {
    Finding.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving Findings.'
        })
      })
  }

  findAllFindingsInArray (req, res) {
    const listOfFinding = req.query.arr
    const ids = listOfFinding.map(id => mongoose.Types.ObjectId(id.toString()))

    Finding.find({ _id : { $in : ids }})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Findings.'
      })
    })
  }
}
