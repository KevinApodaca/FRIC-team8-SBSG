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
        },
        parent: { type: mongoose.Schema.Types.ObjectId, ref: 'system' },
        analyst_assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        collaboration: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        finding_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'finding' }],
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
