module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      doc_id: {
        type: String
      },
      length : {
        type: Number
      },
      name: {
          type: String
      },
      type: {
          type: String
      }
    },
    {collection: 'file'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const File = mongoose.model('file',schema)
  return File
}
