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

  async modifySubtask (newForm, subtaskId) {
    const res = await axios.patch('http://localhost:3000/subtasks/' + subtaskId, newForm)
    return res
  },

  async getMultipleSubtasks (multipleSubtasks) {
    const res = await axios.get('http://localhost:3000/findings/multiple/subtasks', {
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
