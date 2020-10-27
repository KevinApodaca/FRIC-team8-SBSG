module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        subtask: {
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
        finding: {
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
        },
        description: {
          type: String,
          default: ""
        }
    },
    {collection: 'task'}
    )
  
    schema.method('toJSON', function () {
      const { __v, _id, ...object } = this.toObject()
      object.id = _id
      return object
    })
  
    const task = mongoose.model('task', schema)
    return task
  }
  