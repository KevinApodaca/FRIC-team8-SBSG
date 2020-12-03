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
        systems_for_task: {
          type: String,
          default: ''
        },
        findings: {
          type: String,
          default: ''
        },
        task_priority: {
          type: String,
          enum: ['Low', 'Medium', 'High',''],
          default: ''
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
        description: {
          type: String,
          default: ""
        },
        parent: { type: mongoose.Schema.Types.ObjectId },
        analyst_assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        collaborator: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        task_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
        subtask_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtask' }],
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
