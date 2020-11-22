import axios from 'axios'

export default {
  async getEvents () {
    const res = await axios.get('http://localhost:3000/events/all')
    return res
  },

  async getEventSingle (eventId) {
    const res = await axios.get('http://localhost:3000/events/' + eventId)
    return res
  },

  async createEvent (form) {
    const res = await axios.post('http://localhost:3000/events/', form)
    return res
  },

  async deleteEvent (eventId) {
    const res = await axios.delete('http://localhost:3000/events/' + eventId)
    return res
  },

  async modifyEvent (newForm, eventId) {
    const res = await axios.patch('http://localhost:3000/events/' + eventId, newForm)
    return res
  },

  async addAnalyst (eventId, analystId) {
    const analyst = { analyst_association: analystId }
    const res = await axios.patch('http://localhost:3000/events/addItem/' + eventId, analyst)
    return res
  },

  async addSystem (eventId, systemId) {
    const system = { system_association: systemId }
    const res = await axios.patch('http://localhost:3000/events/addItem/' + eventId, system)
    return res
  },

  async addTask (eventId, taskId) {
    const task = { task_association: taskId }
    const res = await axios.patch('http://localhost:3000/events/addItem/' + eventId, task)
    return res
  },

  async addSubtask (eventId, subtaskId) {
    const subtask = { subtask_association: subtaskId }
    const res = await axios.patch('http://localhost:3000/events/addItem/' + eventId, subtask)
    return res
  },

  async addFinding (eventId, findingId) {
    const finding = { finding_association: findingId }
    const res = await axios.patch('http://localhost:3000/events/addItem/' + eventId, finding)
    return res
  },

  async removeAnalyst (eventId, analystId) {
    const analyst = { analyst_association: analystId }
    const res = await axios.patch('http://localhost:3000/events/removeItem/' + eventId, analyst)
    return res
  },

  async removeSystem (eventId, systemId) {
    const system = { system_association: systemId }
    const res = await axios.patch('http://localhost:3000/events/removeItem/' + eventId, system)
    return res
  },

  async removeTask (eventId, taskId) {
    const task = { task_association: taskId }
    const res = await axios.patch('http://localhost:3000/events/removeItem/' + eventId, task)
    return res
  },

  async removeSubtask (eventId, subtaskId) {
    const subtask = { subtask_association: subtaskId }
    const res = await axios.patch('http://localhost:3000/events/removeItem/' + eventId, subtask)
    return res
  },

  async removeFinding (eventId, findingId) {
    const finding = { finding_association: findingId }
    const res = await axios.patch('http://localhost:3000/events/removeItem/' + eventId, finding)
    return res
  }
}
