module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        task: {
          type: Number,
          default: 0
        },
        system: {
          type: String,
          default: ''
        },
        analyst: {
          type: String,
          default: ''
        },
        title: {
          type: String,
          default: ''
        },
        systems: {
          type: String,
          default: ''
        },
        findings: {
          type: String,
          default: ''
        },
        progress: {
          type: Number,
          default: 0
        },
        created:{
          type: String,
          default: '',
        },
        priority: {
          type: String,
          default: ''
        }
    },
    {collection: 'subtask'}
    )
  
    schema.method('toJSON', function () {
      const { __v, _id, ...object } = this.toObject()
      object.id = _id
      return object
    })
  
    const subtask = mongoose.model('subtask', schema)
    return subtask
  }
  