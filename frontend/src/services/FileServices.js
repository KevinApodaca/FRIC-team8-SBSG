import axios from 'axios'

export default {
  async getFiles () {
    const res = await axios.get('http://localhost:3000/files/')
    return res
  },

  async getFilesingle (fileId) {
    const res = await axios.get('http://localhost:3000/files/' + fileId)
    return res
  },

  async createFile (form) {
    const res = await axios.post('http://localhost:3000/files/', form)
    return res
  },

  async deleteFile (fileId) {
    const res = await axios.delete('http://localhost:3000/files/' + fileId)
    return res
  },

  async modifyFile (newForm, fileId) {
    const res = await axios.patch('http://localhost:3000/files/' + fileId, newForm)
    return res
  }
}
