import axios from 'axios'
const qs = require('qs')
const hostname = process.env.VUE_APP_API_HOST

export default {
  async getSystems () {
    const res = await axios.get(`http://${hostname}:3000/systems/all`)
    return res
  },

  async getSystemSingle (systemId) {
    const res = await axios.get(`http://${hostname}:3000/systems/` + systemId)
    return res
  },

  async createSystem (form) {
    const res = await axios.post(`http://${hostname}:3000/systems/`, form)
    return res
  },

  async deleteSystem (systemId) {
    const res = await axios.delete(`http://${hostname}:3000/systems/` + systemId)
    return res
  },

  async modifySystem (systemId, newForm) {
    const res = await axios.patch(`http://${hostname}:3000/systems/` + systemId, newForm)
    return res
  },

  async addTask (systemId, taskId) {
    const task = { task_association: taskId }
    const res = await axios.patch(`http://${hostname}:3000/systems/addItem/` + systemId, task)
    return res
  },

  async addSubtask (systemId, subtaskId) {
    const subtask = { subtask_association: subtaskId }
    const res = await axios.patch(`http://${hostname}:3000/systems/addItem/` + systemId, subtask)
    return res
  },

  async addFinding (systemId, findingId) {
    const finding = { finding_association: findingId }
    const res = await axios.patch(`http://${hostname}:3000/systems/addItem/` + systemId, finding)
    return res
  },

  async removeTask (systemId, taskId) {
    const task = { task_association: taskId }
    const res = await axios.patch(`http://${hostname}:3000/systems/removeItem/` + systemId, task)
    return res
  },

  async removeSubtask (systemId, subtaskId) {
    const subtask = { subtask_association: subtaskId }
    const res = await axios.patch(`http://${hostname}:3000/systems/removeItem/` + systemId, subtask)
    return res
  },

  async removeFinding (systemId, findingId) {
    const finding = { finding_association: findingId }
    const res = await axios.patch(`http://${hostname}:3000/systems/removeItem/` + systemId, finding)
    return res
  },

  async getMultipleSystems (multipleSystems) {
    const res = await axios.get(`http://${hostname}:3000/systems/multiple/systems`, {
      params: {
        arr: multipleSystems
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  }
}
