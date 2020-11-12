/* eslint-disable */
import axios from 'axios'
const qs = require('qs')

export default {
  async getFiles () {
    const res = await axios.get('http://localhost:3000/files/')
    return res
  },

  async getFilesingle (fileId) {
    const res = await axios.get('http://localhost:3000/files/' + fileId)
    return res
  },

  async getMultipleFiles (multipleFiles) {
    const res = await axios.get('http://localhost:3000/files/multiple/Files', {
      params: {
        arr: multipleFiles
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  },

  async upLoadFiles (form) {
    const formData = this.handleFile(form)
    const res = await axios.post('http://localhost:3000/files/', formData)
    const filename = this.handleResponse(res)
    return filename
  },

  async deleteFile (fileId) {
    const res = await axios.delete('http://localhost:3000/files/' + fileId)
    return res
  },

  async modifyFile (newForm, fileId) {
    const res = await axios.patch('http://localhost:3000/files/' + fileId, newForm)
    return res
  },

  handleFile (files) {
    const formData = new FormData()

    for (const index in files) {
      formData.append('upload', files[index])
    }

    return formData
  },

  handleResponse (res) {
    let arr
    if (res.status === 200) {
      arr = res.request.response.match(/([a-zA-Z0-9]{7,10})+(.png|.mov|.docx|.doc|.jpeg|.\m\p\d)/g)
      arr = arr.filter(item => item.length >= 30)
    }

    return arr
  }
}
