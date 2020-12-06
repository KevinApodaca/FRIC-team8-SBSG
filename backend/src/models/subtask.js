module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        task: {
          type: String,
          default: ''
        },
        subtask: {
          type: String,
          default: ''
        },
        collaborator: {
          type: String,
          default: ''
        },
        due_date: {
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
        description: {
          type: String,
          default: ''
        },
        subtask_progress: {
          type: String,
          enum: ['Not Started', 'Assigned', 'Transferred', 'In Progress', 'Complete', 'Not Applicable'],
          default: 'Not Started',
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
        parent: { type: mongoose.Schema.Types.ObjectId },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        analyst_assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        collaboration: { type: mongoose.Schema.Types.ObjectId, ref: 'analyst' },
        finding_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'finding' }],
        subtask_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'finding' }],
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
