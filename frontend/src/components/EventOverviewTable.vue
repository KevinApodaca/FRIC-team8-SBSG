<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table ref="btable"
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data='clients'>

      <b-table-column label="Event Name" field="name" sortable v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="No. of Systems" field="systems" sortable v-slot="props">
        <small class="has-text-grey">{{ props.row.systems }}</small>
      </b-table-column>
      <b-table-column label="No. of Findings" field="findings" sortable v-slot="props">
        <small class="has-text-grey">{{ props.row.findings }}</small>
      </b-table-column>
      <b-table-column cell-class="is-progress-col" label="Progress" field="progress" sortable v-slot="props">
        <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
      </b-table-column>
      <b-table-column label="Created (DD-MM-YYYY hh:mm:ss)" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created_Date">{{ props.row.created_Date }}</small>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'client.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="Event Detailed View">
            <b-icon icon="information" size="is-small"/>
          </router-link>
          <button class="button is-small is-info" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover title="Archive Event">
            <b-icon icon="archive" size="is-small"/>
          </button>
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
import ModalBox from '@/components/ModalBox'
import EventService from '@/services/EventServices'
import LogServices from '@/services/LogTransactionServices'

export default {
  name: 'EventOverviewTable',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
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
      checkedRows: [],
      isConfirmed: true
    }
  },
  created () {
    if (this.dataUrl) {
      this.isLoading = true
      this.getEventData()
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
  methods: {
    async getEventData () {
      EventService.getEvents()
        .then(clients => {
          if (clients.status === 200) {
            this.isLoading = false
            this.$set(this, 'clients', clients.data)
            if (clients.data.length > this.perPage) {
              this.paginated = true
            }
          }
        })
    },
    async trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
      EventService.deleteEvent(this.trashObject.id)
        .then(clients => {
          if (clients.status === 200) {
            console.log(clients.data.message)
            this.removeRow(trashObject)
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    },
    removeRow (trashObject) {
      for (const index in this.clients) {
        if (this.clients[index].id === trashObject.id) {
          this.clients.splice(index, 1)
        }
      }
    },
    trashConfirm () {
      this.isModalActive = false
      this.isConfirmed = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    async logAction () {
      LogServices.logArchiveEvent(this.trashObject.name)
        .then(response => {
          if (response.status === 200) {
            console.log(response)
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    }
  }
}
</script>
