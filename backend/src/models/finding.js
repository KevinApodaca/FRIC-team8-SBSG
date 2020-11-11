module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id_form: {
        type: String,
        default: ''
      },
      system: {
        type: String,
        default: ''
      },
      analyst: {
        type: String,
        default: 'K.A'
      },
      title: {
        type: String,
        default: ''
      },
      findings: {
        type: String,
        default: ''
      },
      tasks: {
        type: Number,
        default: 0
      },
      subtasks: {
        type: String,
        default: '0'
      },
      status: {
        type: String,
        default: ''
      },
      classification: {
        type: String,
        default: ''
      },
      risk: {
        type: String,
        default: ''
      },
      host: {
        type: String,
        default: ''
      },
      ip: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      long : {
        type: String,
        default: ''
      },
      finding_status: {
        type: String,
        enum: ['Open','Closed'],
        default: 'Open'
      },
      likelihood: {
        type: String,
        default: ''
      },
      cfis: {
        type: String,
        default: ''
      },
      ifis: {
        type: String,
        default: ''
      },
      afis: {
        type: String,
        default: ''
      },
      score: {
        type: String,
        default: ''
      },
      finding_desc: {
        type: String,
        default: ''
      },
      finding_long: {
        type: String,
        default: ''
      },
      mitigation_desc: {
        type: String,
        default: ''
      },
      mitigation_long: {
        type: String,
        default: ''
      },
      impact_desc: {
        type: String,
        default: ''
      },
      collaborator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'analyst' }],
      finding_type: {
        type: String,
        enum: [
          'Credentials Complexity',
          'Manufacturer Default Creds',
          'Lack of Authentication',
          'Plain Text Protocols',
          'Plain Text Web Login',
          'Encryption',
          'Authentication Bypass',
          'Port Security',
          'Access Control',
          'Least Privilege',
          'Privilege Escalation',
          'Missing Patches',
          'Physical Security',
          'Information Disclosure'
        ],
        default: 'Credentials Complexity'
      },
      finding_classification: {
        type: String,
        enum: [
          'Vulnerability',
          'Information'
        ],
        default: 'Information'
      },
      finding_confidentiality : {
        type: String,
        enum: [
          'Low',
          'Medium',
          'High',
          'Information'
        ],
        default: 'Information'
      },
      finding_integrity: {
        type: String,
        enum: [
          'Low',
          'Medium',
          'High',
          'Information'
        ],
        default: 'Information'
      },
      finding_availability : {
        type: String,
        enum: [
          'Low',
          'Medium',
          'High',
          'Information'
        ],
        default: 'Information'
      },
      finding_posture: {
        type: String,
        enum: [
          'Insider',
          'Insider-nearsider',
          'Outsider',
          'Nearsider',
          'Nearsider-outsider'
        ],
        default: 'Insider'
      },
      threat_relevance: {
        type: String,
        enum: [
          'Confirmed',
          'Expected',
          'Anticipated',
          'Predicted',
          'Possible'
        ],
        default: 'Confirmed'
      },
      effectiveness_rating: {
        type: String,
        enum: [
          'Very high (10)',
          'High (7-9)',
          'Moderate (4-6)',
          'Low (1-3)',
          'Very low (0)'
        ],
        default: 'Very high (10)'
      },
      impact_level: {
        type: String,
        enum:  [
          'VH',
          'H',
          'M',
          'L',
          'VL',
          'Information'
        ],
        default: 'Information'
      },
    },
    {collection: 'finding'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const finding = mongoose.model('finding', schema)
  return finding
}
