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
        {{ props.row.system }}
      </b-table-column>
      <b-table-column label="Analyst" field="analyst" sortable v-slot="props">
        {{ props.row.analyst }}
      </b-table-column>
      <b-table-column label="Priority" field="priority" sortable v-slot="props">
        {{ props.row.priority }}
      </b-table-column>
      <b-table-column cell-class="is-progress-col" label="Progress" field="progress" sortable v-slot="props">
        <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
      </b-table-column>
      <b-table-column label="No. of Subtasks" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.subtasks">{{ props.row.subtasks }}</small>
      </b-table-column>
      <b-table-column label="No. of Findings" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.findings">{{ props.row.findings }}</small>
      </b-table-column>
      <b-table-column label="Due Date" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'tasks.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="Task Detailed View">
            <b-icon icon="information" size="is-small"/>
          </router-link>
          <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover title="Delete Task">
            <b-icon icon="trash-can" size="is-small"/>
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
import axios from 'axios'
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
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.tasks = r.data.data
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
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
