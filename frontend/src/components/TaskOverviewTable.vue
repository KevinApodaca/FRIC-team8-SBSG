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
      :data='tasks'>

      <b-table-column label="Title" field="title" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column label="System" field="systems" sortable v-slot="props">
        <small class="has-text-grey">{{ props.row.systems_for_task }}</small>
      </b-table-column>
      <b-table-column label="Analyst" field="analyst" sortable v-slot="props">
        <small class="has-text-grey">{{ props.row.analyst }}</small>
      </b-table-column>
      <b-table-column label="Priority" field="priority" sortable v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.task_priority"> {{ props.row.task_priority }} </small>
      </b-table-column>
      <b-table-column label="Progress" field="progress" sortable v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.task_progress"> {{props.row.task_progress }} </small>
      </b-table-column>
      <b-table-column label="No. of Subtasks" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.subtasks">{{ props.row.subtask_association.length }}</small>
      </b-table-column>
      <b-table-column label="No. of Findings" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.findings">{{ props.row.finding_association.length }}</small>
      </b-table-column>
      <b-table-column label="Due Date (DD-MM-YYYY)" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'tasks.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="Task Detailed View">
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
import TaskService from '@/services/TaskServices'
import SystemService from '@/services/SystemServices'
import SubtaskService from '@/services/SubtaskServices'
import LogServices from '@/services/LogTransactionServices'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'TaskOverviewTable',
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
      tasks: [],
      allSubtasks: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  async created () {
    await this.getTaskData()
    await this.getRelatedSubtasks()
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
    async getTaskData () {
      await TaskService.getTasks()
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'tasks', response.data)
          }
        })
        .catch(e => { this.displayError(e) })
    },
    async getRelatedSubtasks () {
      await SubtaskService.getSubtasks()
        .then(response => {
          this.allSubtasks = response.data
        })
    },
    async deleteTask () {
      await TaskService.deleteTask(this.trashObject.id)
        .catch(e => { this.displayError(e) })
    },
    async removeFromSystem () {
      if (this.trashObject.parent) {
        await SystemService.removeTask(this.trashObject.parent, this.trashObject.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async removeFromTask (task) {
      if (task.task_association.includes(this.trashObject.id)) {
        await TaskService.removeTask(task.id, this.trashObject.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async removeFromSubtask (subtask) {
      if (subtask.parent === this.trashObject.id) {
        const removeParent = { parent: null, task: '' }
        await SubtaskService.modifySubtask(subtask.id, removeParent)
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
      await this.tasks.map(this.removeFromSystem)
      await this.tasks.map(this.removeFromTask)
      await this.allSubtasks.map(this.removeFromSubtask)
      await this.deleteTask()
      await this.removeFromSystem()
      await this.logAction()
    },
    async logAction () {
      await LogServices.logArchiveTask(this.trashObject.title)
        .catch(e => { this.displayError(e) })
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashCancel () {
      this.isModalActive = false
    },
    removeRow (trashObject) {
      for (const index in this.tasks) {
        if (this.tasks[index].id === trashObject.id) {
          this.tasks.splice(index, 1)
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

      return (lastPart === 'tasks') ? 'Archive Task' : 'Delete Task'
    },
    iconType () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'tasks') ? 'archive' : 'trash-can'
    },
    setRemoveItemColor () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'tasks') ? 'button is-small is-info' : 'button is-small is-danger'
    }
  }
}
</script>
