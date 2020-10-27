import axios from 'axios'

export default {
  async getSystems () {
    const res = await axios.get('http://localhost:3000/systems/all')
    return res
  },

  async getSystemSingle (eventId) {
    const res = await axios.get('http://localhost:3000/systems/' + eventId)
    return res
  },

  async createSystem (form) {
    const res = await axios.post('http://localhost:3000/systems/', form)
    return res
  },

  async deleteSystem (eventId) {
    const res = await axios.delete('http://localhost:3000/systems/' + eventId)
    return res
  },

  async modifySystem (newForm, eventId) {
    const res = await axios.patch('http://localhost:3000/systems/' + eventId, newForm)
    return res
  }
}
