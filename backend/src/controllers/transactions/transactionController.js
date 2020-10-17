const db = require('../../models')
const Transaction = db.transaction

export class TransactionController {
  create (req, res) {
    const transaction = new Transaction(req.body)
    transaction
      .save(transaction)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while creating the Transaction.'
        })
      })
  }

  read (req, res) {
    const id = req.params.transactionId
    Transaction.findById(id)
      .then(data => {
        if (!data) { res.status(404).send({ message: 'Not found Transaction with id ' + id }) } else res.send(data)
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error retrieving Transaction with id=' + id + err.message })
      })
  }

  update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data is Empty :('
      })
    }

    const id = req.params.transactionId

    Transaction.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Transaction with id=${id}!`
          })
        } else res.send({ message: 'Transaction was updated successfully.' })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating Transaction with id=' + id + err.message
        })
      })
  }

  delete (req, res) {
    const id = req.params.transactionId

    Transaction.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Transaction with id=${id}! It was not found :(`
          })
        } else {
          res.send({
            message: 'Transaction was deleted successfully!'
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete Transaction with id=' + id + err.message
        })
      })
  }

  findAllTransactions (req, res) {
    Transaction.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving Transactions.'
        })
      })
  }
}
