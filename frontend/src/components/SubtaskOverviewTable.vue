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
      :data='subtasks'>

      <b-table-column label="Title" field="title" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column label="Task" field="task" sortable v-slot="props">
        <span class="has-text-grey">{{ props.row.task }}</span>
      </b-table-column>
      <b-table-column label="Analyst" field="analyst" sortable v-slot="props">
        <span class="has-text-grey">{{ props.row.analyst }}</span>
      </b-table-column>
      <b-table-column label="Progress" field="progress" sortable v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.subtask_progress"> {{ props.row.subtask_progress }}</small>
      </b-table-column>
      <b-table-column label="No. of Findings" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.findings">{{ props.row.finding_association.length }}</small>
      </b-table-column>
      <b-table-column label="Due Date (DD-MM-YYYY)" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.due_date">{{ props.row.due_date }}</small>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'subtasks.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="Subtask Detailed View">
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
import SubtaskService from '@/services/SubtaskServices'
import TaskService from '@/services/TaskServices'
import LogServices from '@/services/LogTransactionServices'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'SubtaskOverviewTable',
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
      subtasks: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  created () {
    this.getSubtaskData()
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
    async getSubtaskData () {
      SubtaskService.getSubtasks()
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'subtasks', response.data)
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async logAction () {
      LogServices.logArchiveSubtask(this.trashObject.title)
        .catch(e => { this.displayError(e) })
    },
    async trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    async trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })

      this.removeRow(this.trashObject)
      await this.subtasks.map(this.removeFromSubtask)
      await this.deleteSubtask()
      await this.removeFromTask()
      await this.logAction()
    },
    async deleteSubtask () {
      await SubtaskService.deleteSubtask(this.trashObject.id)
        .catch(e => { this.displayError(e) })
    },
    async removeFromTask () {
      if (this.trashObject.parent) {
        await TaskService.removeSubtask(this.trashObject.parent, this.trashObject.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async removeFromSubtask (subtask) {
      if (subtask.subtask_association.includes(this.trashObject.id)) {
        await SubtaskService.removeSubtask(subtask.id, this.trashObject.id)
          .catch(e => { this.displayError(e) })
      }
    },
    trashCancel () {
      this.isModalActive = false
    },
    removeRow (trashObject) {
      for (const index in this.subtasks) {
        if (this.subtasks[index].id === trashObject.id) {
          this.subtasks.splice(index, 1)
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

      return (lastPart === 'subtasks') ? 'Archive Subtask' : 'Delete Subtask'
    },
    iconType () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'subtasks') ? 'archive' : 'trash-can'
    },
    setRemoveItemColor () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)

      return (lastPart === 'subtasks') ? 'button is-small is-info' : 'button is-small is-danger'
    }
  }
}
</script>
