import axios from 'axios'
const qs = require('qs')

export default {
  async getSubtasks () {
    const res = await axios.get('http://localhost:3000/subtasks/all')
    return res
  },

  async getSubtaskSingle (subtaskId) {
    const res = await axios.get('http://localhost:3000/subtasks/' + subtaskId)
    return res
  },

  async createSubtask (form) {
    const res = await axios.post('http://localhost:3000/subtasks/', form)
    return res
  },

  async deleteSubtask (subtaskId) {
    const res = await axios.delete('http://localhost:3000/subtasks/' + subtaskId)
    return res
  },

  async modifySubtask (subtaskId, newForm) {
    const res = await axios.patch('http://localhost:3000/subtasks/' + subtaskId, newForm)
    return res
  },

  async addFinding (subtaskId, findingId) {
    const finding = { finding_association: findingId }
    const res = await axios.patch('http://localhost:3000/subtasks/addItem/' + subtaskId, finding)
    return res
  },

  async removeFinding (subtaskId, findingId) {
    const finding = { finding_association: findingId }
    const res = await axios.patch('http://localhost:3000/subtasks/removeItem/' + subtaskId, finding)
    return res
  },

  async getMultipleSubtasks (multipleSubtasks) {
    const res = await axios.get('http://localhost:3000/subtasks/multiple/subtasks', {
      params: {
        arr: multipleSubtasks
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  }
}
