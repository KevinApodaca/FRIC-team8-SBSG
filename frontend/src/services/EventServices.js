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

// if (res.data.response === 200) {
//   logAction(res)
// }

// mounted () {
//   this.getEventData()
//   if (this.dataUrl) {
//     this.isLoading = true
//     axios
//       .get(this.dataUrl)
//       .then(r => {
//         this.isLoading = false
//         if (r.data.length > this.perPage) {
//           this.paginated = true
//         }
//         this.clients = r.data
//       })
//       .catch(e => {
//         this.isLoading = false
//         this.$buefy.toast.open({
//           message: `Error: ${e.message}`,
//           type: 'is-danger'
//         })
//       })
//   }
// },

// axios.delete('http://localhost:3000/events/' + this.trashObject.id)
//   .then(response => {
//     console.log(response)
//     // this.fireDelete(trashObject)
//     // this.tableData.splice(this.tableData.indexOf(trashObject), 1)
//     // this.photos.splice(trashObject, 1)
//     // this.organisations.splice(trashObject, 1)
//   })
//   .catch(error => {
//     this.$buefy.toast.open({
//       message: `Error: ${error.message}`,
//       type: 'is-danger',
//       queue: false
//     })
//   })

// console.log('Hello There')
// console.log(this.form)
// axios.post('http://localhost:3000/events/', this.form)
//   .then(response => {
//     console.log(response)
//     if (response.status === 200) {
//       var trans = {
//         initials: 'K.A',
//         time: Date.now(),
//         action: 'K.A created Event ' + this.form.name
//       }
//       axios.post('http://localhost:3000/transactions/', trans)
//         .then(res => {
//           console.log(res)
//         })
//         .catch(error => {
//           this.$buefy.toast.open({
//             message: `Error: ${error.message}`,
//             type: 'is-danger',
//             queue: false
//           })
//         })
//     }
//   })
//   .catch(error => {
//     this.$buefy.toast.open({
//       message: `Error: ${error.message}`,
//       type: 'is-danger',
//       queue: false
//     })
//   })

// axios
//   .get('http://localhost:3000/events/' + this.id)
//   .then(r => {
//     // const item = find(r.data.data, item => item.id === parseInt(this.id))
//     const item = r.data
//     if (item) {
//       this.isProfileExists = true
//       this.form = item
//       this.form.created_date = new Date(item.created_mm_dd_yyyy)
//       this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
//     } else {
//       this.$router.push({ name: 'client.new' })
//     }
//   })
//   .catch(e => {
//     this.$buefy.toast.open({
//       message: `Error: ${e.message}`,
//       type: 'is-danger',
//       queue: false
//     })
//   })

// axios.patch('http://localhost:3000/events/' + this.id, this.form)
//   .then(response => {
//     console.log(response)
//     if (response.status === 200) {
//       var trans = {
//         initials: 'K.A',
//         time: Date.now(),
//         action: 'K.A made changes to ' + this.form.name
//       }
//       axios.post('http://localhost:3000/transactions/', trans)
//         .then(res => {
//           console.log(res)
//         })
//         .catch(error => {
//           this.$buefy.toast.open({
//             message: `Error: ${error.message}`,
//             type: 'is-danger',
//             queue: false
//           })
//         })
//     }
//   })
//   .catch(error => {
//     console.log(error.message)
//   })
// }
