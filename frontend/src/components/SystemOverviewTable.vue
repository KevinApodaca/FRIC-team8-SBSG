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
      :data='systems'>

      <b-table-column label="System" field="system" sortable v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="No. of Tasks" field="tasks" sortable v-slot="props">
        {{ props.row.tasks }}
      </b-table-column>
      <b-table-column label="No. of Findings" field="findings" sortable v-slot="props">
        {{ props.row.findings }}
      </b-table-column>
      <b-table-column cell-class="is-progress-col" label="Progress" field="progress" sortable v-slot="props">
        <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'system.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="System Detailed View">
            <b-icon icon="information" size="is-small"/>
          </router-link>
          <button class="button is-small is-info" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover :title="removeItem()">
            <b-icon :icon="iconType()" size="is-small"/>
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
import SystemService from '@/services/SystemServices'
import LogServices from '@/services/LogTransactionServices'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'SystemOverviewTable',
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
      systems: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  created () {
    if (this.dataUrl) {
      this.isLoading = true
      this.getSystemData()
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
    async getSystemData () {
      SystemService.getSystems()
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'systems', response.data)
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
      SystemService.deleteSystem(this.trashObject.id)
        .then(response => {
          if (response.status === 200) {
            this.removeRow(trashObject)
            console.log(response.data.message)
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    removeRow (trashObject) {
      console.log('removeItem')
      for (const index in this.systems) {
        if (this.systems[index].id === trashObject.id) {
          this.systems.splice(index, 1)
        }
      }
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
    },
    async logAction () {
      var trans = {
        initials: 'K.A',
        action: 'K.A archived system ' + this.trashObject.name
      }
      LogServices.logAction(trans)
        .then(response => {
          if (response.status === 200) {
            console.log(response)
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
    removeItem () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'systems') ? 'Archive System' : 'Delete System'
    },
    iconType () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'systems') ? 'archive' : 'trash-can'
    }
  }
}
</script>
