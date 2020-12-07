import axios from 'axios'

export default {
  async findingsForm () {
    var response = null
    const systems = axios.get('http://localhost:3000/systems/all')
    const tasks = axios.get('http://localhost:3000/tasks/all')
    const subtasks = axios.get('http://localhost:3000/subtasks/all')
    const findings = axios.get('http://localhost:3000/findings/all')
    const analysts = axios.get('http://localhost:3000/analysts/all')

    await axios.all([systems, tasks, subtasks, findings, analysts])
      .then(axios.spread((...responses) => {
        response = responses
      }))

    return response
  }
}
