module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstName: {
        type: String,
        default: ''
      },
      lastName: {
        type: String,
        default: ''
      },
      initials: {
        type: String,
        default: ''
      },
      title: [String],
      role: {
        type: String,
        enum: ['Lead Analyst', 'Collaborator',''],
        default: ''
      }
    },
    {collection: 'analyst'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Analyst = mongoose.model('analyst',schema)
  return Analyst
}
