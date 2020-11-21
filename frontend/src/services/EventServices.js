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

  async addAnalyst (analystId, eventId) {
    const analyst = this.analyst_json(analystId)
    const res = await axios.patch('http://localhost:3000/events/analyst/' + eventId, analyst)
    return res
  },

  async addSystem (systemId, eventId) {
    const system = this.system_json(systemId)
    const res = await axios.patch('http://localhost:3000/events/system/' + eventId, system)
    return res
  },

  async removeAnalyst (analystId, eventId) {
    const analyst = this.analyst_json(analystId)
    const res = await axios.patch('http://localhost:3000/events/remove/analyst/' + eventId, analyst)
    return res
  },

  async removeSystem (systemId, eventId) {
    const system = this.system_json(systemId)
    const res = await axios.patch('http://localhost:3000/events/remove/system/' + eventId, system)
    return res
  },

  system_json (id) {
    const system = {
      system_association: id
    }
    return system
  },

  analyst_json (id) {
    const system = {
      analyst_association: id
    }
    return system
  }
}
