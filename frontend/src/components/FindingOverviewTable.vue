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
      :data='findings'>

      <b-table-column label="ID" field="id" sortable v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column label="Title" field="title" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column label="System" field="system" sortable v-slot="props">
        {{ props.row.system }}
      </b-table-column>
      <b-table-column label="Task" field="task" sortable v-slot="props">
        {{ props.row.tasks }}
      </b-table-column>
      <b-table-column label="Subtask" field="subtask" sortable v-slot="props">
        {{ props.row.subtasks }}
      </b-table-column>
      <b-table-column label="Analyst" field="analyst" sortable v-slot="props">
        {{ props.row.analyst }}
      </b-table-column>
      <b-table-column label="Status" field="status" sortable v-slot="props">
        {{ props.row.status }}
      </b-table-column>
      <b-table-column label="Classification" field="classification" sortable v-slot="props">
        {{ props.row.classification }}
      </b-table-column>
      <b-table-column label="Type" field="type" sortable v-slot="props">
        {{ props.row.type }}
      </b-table-column>
      <b-table-column label="Risk" field="risk" sortable v-slot="props">
        {{ props.row.risk }}
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'finding.edit', params: {id: props.row.id}}" class="button is-small is-primary" v-b-tooltip.hover title="Finding Detailed View">
            <b-icon icon="information" size="is-small"/>
          </router-link>
          <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover title="Archive Finding">
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
import FindingServices from '@/services/FindingServices'

export default {
  name: 'FindingOverviewTable',
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
      findings: [],
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
    this.isLoading = true
    FindingServices.getFindings()
      .then(response => {
        if (response.status === 200) {
          this.findings = response.data
          this.isLoading = false
        }
      })
      .catch(e => {
        this.isLoading = false
        this.displayError(e)
      })
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
