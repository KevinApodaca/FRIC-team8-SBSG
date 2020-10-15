module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        default: ''
      },
      system: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      location: {
        type: String,
        default: ''
      },
      router: {
        type: String,
        default: ''
      },
      switches: {
        type: String,
        default: ''
      },
      room: {
        type: String,
        default: ''
      },
      plan:{
        type: String,
        default: '',
      },
      analyst: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ""
      },
      findings: {
        type: String,
        default: '0'
      },
      progress: {
        type: Number,
        default: 0
      },
      task: {
        type: String,
        default: ''
      },
      status: {
        type: String,
        default: '0'
      },
      type: {
        type: String,
        default: ""
      },
      classification:{
        type: String,
        default: ''
      },
      risk: {
        type: String,
        default: ''
      }
  },
  {collection: 'system'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const system = mongoose.model('system', schema)
  return system
}
