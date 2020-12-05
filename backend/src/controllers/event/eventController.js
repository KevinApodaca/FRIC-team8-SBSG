const db = require('../../models')
const Event = db.events

export class EventController {
  create (req, res) {
    const event = new Event(req.body)
    event
      .save(event)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the Event.'
        })
      })
  }

  read (req, res) {
    const id = req.params.eventId
    Event.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found Event with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving Event with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.eventId

    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Event with id=${id}!`
          })
        } else res.send({ message: 'Event was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Event with id=' + id + err.message
        })
      })
  }

  updateArray (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.eventId

    Event.findByIdAndUpdate(id, {$push: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Event with id=${id}!`
          })
        } else res.send({ message: 'Event was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Event with id=' + id + ' ' + err.message
        })
      })
  }


  removeItemInArray (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.eventId

    Event.findByIdAndUpdate(id, {$pull: req.body}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Event with id=${id}!`
          })
        } else res.send({ message: 'Event was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Event with id=' + id + ' ' + err.message
        })
      })
  }


  delete (req, res) {
    const id = req.params.eventId

    Event.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Event with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'Event was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete Event with id=' + id + err.message
        })
      })
  }

  findAllEvents (req, res) {
    Event.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving events.'
        })
      })
  }
}
