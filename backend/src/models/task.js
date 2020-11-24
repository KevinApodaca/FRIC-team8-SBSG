module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        subtasks: {
          type: String,
          default: ''
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
        task_progress: {
          type: String,
          enum: ['Not Started', 'Transferred', 'In Progress', 'Complete', 'Not Applicable'],
          default: 'Not Started',
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
