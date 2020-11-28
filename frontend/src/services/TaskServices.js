import axios from 'axios'
const qs = require('qs')

export default {
  async getTasks () {
    const res = await axios.get('http://localhost:3000/tasks/all')
    return res
  },

  async getTaskSingle (taskId) {
    const res = await axios.get('http://localhost:3000/tasks/' + taskId)
    return res
  },

  async createTask (form) {
    const res = await axios.post('http://localhost:3000/tasks/', form)
    return res
  },

  async deleteTask (taskId) {
    const res = await axios.delete('http://localhost:3000/tasks/' + taskId)
    return res
  },

  async modifyTask (taskId, newForm) {
    const res = await axios.patch('http://localhost:3000/tasks/' + taskId, newForm)
    return res
  },

  async addTask (taskId, task2Id) {
    const task = { task_association: task2Id }
    const res = await axios.patch('http://localhost:3000/tasks/addItem/' + taskId, task)
    return res
  },

  async addSubtask (taskId, subtaskId) {
    const subtask = { subtask_association: subtaskId }
    const res = await axios.patch('http://localhost:3000/tasks/addItem/' + taskId, subtask)
    return res
  },

  async addFinding (taskId, findingkId) {
    const finding = { finding_association: findingkId }
    const res = await axios.patch('http://localhost:3000/tasks/addItem/' + taskId, finding)
    return res
  },

  async removeTask (taskId, task2Id) {
    const task = { task_association: task2Id }
    const res = await axios.patch('http://localhost:3000/tasks/removeItem/' + taskId, task)
    return res
  },

  async removeSubtask (taskId, subtaskId) {
    const subtask = { subtask_association: subtaskId }
    const res = await axios.patch('http://localhost:3000/tasks/removeItem/' + taskId, subtask)
    return res
  },

  async removeFinding (taskId, findingkId) {
    const finding = { finding_association: findingkId }
    const res = await axios.patch('http://localhost:3000/tasks/removeItem/' + taskId, finding)
    return res
  },

  async getMultipleTasks (multipleTasks) {
    const res = await axios.get('http://localhost:3000/tasks/multiple/tasks', {
      params: {
        arr: multipleTasks
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  },

  getTaskProgress (task) {
    const newTaskObj = {
      task_progress: task.task_progress
    }
    return newTaskObj
  }
}
