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
        <small class="has-text-grey">{{ props.row.task_association.length }}</small>
      </b-table-column>
      <b-table-column label="No. of Findings" field="findings" sortable v-slot="props">
        <small class="has-text-grey">{{ props.row.finding_association.length }}</small>
      </b-table-column>
      <b-table-column cell-class="is-progress-col" label="Progress" field="progress" sortable v-slot="props">
        <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'system.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="System Detailed View">
            <b-icon icon="information" size="is-small"/>
          </router-link>
          <button :class="setRemoveItemColor()" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover :title="removeItemAction()">
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
import EventService from '@/services/EventServices'
import SystemService from '@/services/SystemServices'
import TaskService from '@/services/TaskServices'
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
      evenId: null,
      systems: [],
      tasks: [],
      isLoading: true,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  async created () {
    await this.getSystem()
    await this.getEvent()
    await this.getRelatedTasks()
    this.isLoading = false
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
    async getEvent () {
      await EventService.getEvents()
        .then(response => { this.eventId = response.data[0].id })
        .catch(e => { this.displayError(e) })
    },
    async getSystem () {
      await SystemService.getSystems()
        .then(response => {
          if (response.status === 200) {
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'systems', response.data)
          }
        })
        .catch(e => { this.displayError(e) })
    },
    async getRelatedTasks () {
      TaskService.getTasks()
        .then(response => {
          this.tasks = response.data
        })
    },
    async deleteSystem () {
      await SystemService.deleteSystem(this.trashObject.id)
        .catch(e => { this.displayError(e) })
    },
    async removeFromEvent () {
      EventService.removeSystem(this.eventId, this.trashObject.id)
        .catch(e => { this.displayError(e) })
    },
    async removeFromTasks (task) {
      if (task.parent === this.trashObject.id) {
        const removeParent = { parent: null, systems_for_task: '' }
        await TaskService.modifyTask(task.id, removeParent)
          .catch(e => { this.displayError(e) })
      }
    },
    async trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })

      this.removeRow(this.trashObject)
      await this.tasks.map(this.removeFromTasks)
      await this.removeFromEvent()
      await this.deleteSystem()
      await this.logAction()
    },
    async logAction () {
      await LogServices.logArchiveSystem(this.trashObject.name)
        .catch(e => { this.displayError(e) })
    },
    trashCancel () {
      this.isModalActive = false
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    removeRow (trashObject) {
      for (const index in this.systems) {
        if (this.systems[index].id === trashObject.id) {
          this.systems.splice(index, 1)
        }
      }
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    },
    removeItemAction () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'systems') ? 'Archive System' : 'Delete System'
    },
    iconType () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'systems') ? 'archive' : 'trash-can'
    },
    setRemoveItemColor () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'systems') ? 'button is-small is-info' : 'button is-small is-danger'
    }
  }
}
</script>
