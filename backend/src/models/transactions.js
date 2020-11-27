module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      initials: {
        type: String,
        default: ''
      },
      time: {
        type: Date,
        default: new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-') + ": " +
        new Date().toTimeString().split(" ")[0]
      },
      action: {
        type: String,
        default: ''
      }
  },
  {collection: 'transaction'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const transaction = mongoose.model('transaction', schema)
  return transaction
}
