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
  }
}
