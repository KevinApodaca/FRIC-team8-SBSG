import axios from 'axios'

export default {
  async logAction (transaction) {
    const res = await axios.post('http://localhost:3000/transactions/', transaction)
    return res
  },

  async getTransactions () {
    const res = await axios.get('http://localhost:3000/transactions/all')
    return res
  }
}
