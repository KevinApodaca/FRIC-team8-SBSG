module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
      type: String,
      default: ''
    },
    derived: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    event_type: {
      type: String,
      enum: ['CVPA', 'CVI', 'VOF'],
      default: 'CVPA',
    },
    version: {
      type: String,
      default: "",
    },
    created: {
      type: String,
      default: "",
    },
    created_Date: {
      type: String,
      default: new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-') + ": " +
      new Date().toTimeString().split(" ")[0],
    },
    created_mm_dd_yyyy: {
      type: Date,
      default: ""
    },
    organization: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: 'None',
    },
    sctg: {
      type: String,
      default: 'None',
    },
    event_classification:{
      type: String,
      default: 'Top Secret',
      enum: ['Top Secret', 'Secret', 'Confidential', 'Classified','Unclassified']
    },
    declassified_date:{
      type: Date,
      default: '',
    },
    customer_name: {
      type: String,
    },
    archive:{
      type: String,
      default: '',
    },
    systems: {
      type: String,
      default: '0',
    },
    initials: {
      type: String,
      default: '',
    },
    findings: {
      type: String,
      default: '0',
    },
    progress: {
      type: Number,
      default: 0,
    },
    system_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'system' }],
    task_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
    subtask_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtask' }],
    finding_association: [{ type: mongoose.Schema.Types.ObjectId, ref: 'finding' }],
    analyst: [{ type: mongoose.Schema.Types.ObjectId, ref: 'analyst' }],
  },
  {collection: 'event'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Event = mongoose.model('event', schema)
  return Event
}
