<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data='clients'>

      <b-table-column label="Analyst Initials" field="name" sortable v-slot="props">
        {{ props.row.initials }}
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link to="/profile" class="button is-small is-primary" v-b-tooltip.hover title="Edit">
            <b-icon icon="account-edit" size="is-small"/>
          </router-link>
          <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover title="Remove">
            <b-icon icon="trash-can" size="is-small"/>
          </button>
          <router-link to="/forms">
            <button class="button is-small is-info" type="button" v-b-tooltip.hover title="Sync">
              <b-icon icon="sync" size="is-small"/>
              </button>
          </router-link>
        </div>
      </b-table-column>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import AnalystService from '@/services/AnalystServices'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'AnalystsTable',
  components: { ModalBox },
  props: {
    dataUrl: [],
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }
      return null
    }
  },
  async mounted () {
    await AnalystService.getAnalystFromEvent(this.dataUrl)
      .then(response => {
        this.$set(this, 'clients', response.data)
      })
      .catch(e => {
        this.displayError(e)
      })
    console.log('This after computing the AnalystService')
    console.log(this.clients)
    this.isLoading = false
  },
  methods: {
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
<!-- async created () {
  this.isLoading = true
  console.log('Is loading before: ' + this.isLoading)
  await this.eventAnalyst()
  console.log('Is loading after: ' + this.isLoading)
  console.log(this.clients)
}, -->

<!-- async eventAnalyst () {
  if (this.dataUrl) {
    await AnalystService.getAnalystFromEvent(this.dataUrl)
      .then(response => {
        this.$set(this, 'clients', response.data)
        // this.clients = response.data
        // this.isLoading = false
      })
      .catch(e => {
        console.log(e.message)
        this.displayError(e)
      })
    this.isLoading = false
  }
}, -->

<!-- // .then(response => {
//   // this.$set(this, 'clients', response.data)
//   this.clients = response.data
//   console.log('This after response')
//   this.isLoading = false
// })
// .catch(e => {
//   console.log(e.message)
//   this.displayError(e)
// }) -->
