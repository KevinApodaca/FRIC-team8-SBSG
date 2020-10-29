import axios from 'axios'
const qs = require('qs')

export default {
  async getAnalysts () {
    const res = await axios.get('http://localhost:3000/analysts/all')
    return res
  },

  async getAnalystSingle (analystId) {
    const res = await axios.get('http://localhost:3000/analysts/' + analystId)
    return res
  },

  async createAnalyst (form) {
    const res = await axios.post('http://localhost:3000/analysts/', form)
    return res
  },

  async deleteAnalyst (analystId) {
    const res = await axios.delete('http://localhost:3000/analysts/' + analystId)
    return res
  },

  async modifyAnalyst (newForm, analystId) {
    const res = await axios.patch('http://localhost:3000/analysts/' + analystId, newForm)
    return res
  },

  async getAnalystFromEvent (listOfAnalyst) {
    const res = await axios.get('http://localhost:3000/analysts/listOfAnalyst', {
      params: {
        arr: listOfAnalyst
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  }
}
