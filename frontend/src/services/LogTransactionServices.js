import axios from 'axios'

export default {
  async logAction (transaction) {
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async getTransactions () {
    const res = await axios.get('http://localhost:3000/transactions/all')
    return res
  },

  async logArchiveEvent (event) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Archived Event ' + event
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logCreatedEvent (event) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Created Event ' + event
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logChangesFromEvent (oldForm, newForm) {
    var changes = this.showDiffsForEvent(oldForm, newForm)
    const transaction = {
      initials: 'K.A',
      action: changes
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logArchiveSystem (system) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Archived System ' + system
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logCreatedSystem (system) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Created System ' + system
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logChangesFromSystem (oldForm, newForm) {
    var changes = this.showDiffsForSystem(oldForm, newForm)
    const transaction = {
      initials: 'K.A',
      action: changes
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logArchiveTask (task) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Archived Task ' + task
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logCreatedTask (task) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Created Task ' + task
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logChangesFromTask (oldForm, newForm) {
    var changes = this.showDiffsForTask(oldForm, newForm)
    const transaction = {
      initials: 'K.A',
      action: changes
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logArchiveSubtask (subtask) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Archived Subtask ' + subtask
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logCreatedSubtask (subtask) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Created Subtask ' + subtask
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logChangesFromSubtask (oldForm, newForm) {
    var changes = this.showDiffsForSubtask(oldForm, newForm)
    const transaction = {
      initials: 'K.A',
      action: changes
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logArchiveFinding (finding) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Archived Finding ' + finding
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logCreatedFinding  (finding) {
    const transaction = {
      initials: 'K.A',
      action: 'K.A Created Finding ' + finding
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async logChangesFromFinding  (oldForm, newForm) {
    var changes = this.showDiffsForFinding(oldForm, newForm)
    const transaction = {
      initials: 'K.A',
      action: changes
    }
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  showDiffsForEvent (oldForm, newForm) {
    var changes = 'K.A made the following changes to ' +
                    'properties on event ' + oldForm.name
    for (const property in newForm) {
      if (oldForm[property] !== newForm[property]) {
        changes += ': ' + property + ' from ' + oldForm[property] +
                    ' to ' + newForm[property]
      }
    }
    return changes
  },

  showDiffsForSystem (oldForm, newForm) {
    var changes = 'K.A made the following changes to ' +
                    'properties on System ' + oldForm.name
    for (const property in newForm) {
      if (oldForm[property] !== newForm[property]) {
        changes += ': ' + property + ' from ' + oldForm[property] +
                    ' to ' + newForm[property]
      }
    }
    return changes
  },

  showDiffsForTask (oldForm, newForm) {
    var changes = 'K.A made the following changes to ' +
                    'properties on Task ' + oldForm.title
    for (const property in newForm) {
      if (oldForm[property] !== newForm[property]) {
        changes += ': ' + property + ' from ' + oldForm[property] +
                    ' to ' + newForm[property]
      }
    }
    return changes
  },

  showDiffsForSubtask (oldForm, newForm) {
    var changes = 'K.A made the following changes to ' +
                    'properties on Subtask ' + oldForm.title
    for (const property in newForm) {
      if (oldForm[property] !== newForm[property]) {
        changes += ': ' + property + ' from ' + oldForm[property] +
                    ' to ' + newForm[property]
      }
    }
    return changes
  },

  showDiffsForFinding (oldForm, newForm) {
    var changes = 'K.A made the following changes to ' +
                    'properties on Finding ' + oldForm.finding_title
    for (const property in newForm) {
      if (oldForm[property] !== newForm[property]) {
        changes += ': ' + property + ' from ' + oldForm[property] +
                    ' to ' + newForm[property]
      }
    }
    return changes
  }
}
