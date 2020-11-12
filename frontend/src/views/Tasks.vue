<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Tasks
      <button type="submit" class="button is-light is-info is-small" title="About Tasks" @click="taskHelp">
        <b-icon icon="help" custom-size="default"/>
      </button>
      <router-link slot="right" to='/createtask-form' class="button">
        New Task
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="bell" custom-size="default"/>
          <b>Notification</b>
        <br>
    <b-table
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data='tasks'>

      <b-table-column v-slot="props">
        <b> Task {{ props.row.title }} is due on {{ props.row.created}} </b>
      </b-table-column>
    </b-table>
        </div>
      </notification>
      <card-component class="has-table has-mobile-sort-spaced" title="Task Overview Table" icon="playlist-edit">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
            <div slot="left" class="buttons has-addons">
            <button class="button is-rounded is-info is-outline">Archive</button>
            <button class="button is-rounded is-success">Demote</button>
            </div>
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <input class="input" type="text" placeholder="Search for a task...">
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  <b-icon icon="table-search" custom-size="default"/>
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <task-overview-table data-url="http://localhost:3000/tasks/all" :checkable="true"/>
      </card-component>
    </section>
  </div>
</template>

<script>
import TaskService from '@/services/TaskServices'
import TaskOverviewTable from '@/components/TaskOverviewTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
import Notification from '@/components/Notification'
import swal from 'sweetalert'
export default {
  name: 'Task',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, TaskOverviewTable, Notification },
  data () {
    return {
      isModalActive: false,
      tasks: [],
      isLoading: false,
      piginated: false,
      perPage: 10,
      checkedRows: [],
      isDismissed: false
    }
  },
  created () {
    this.getTaskData()
  },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Task'
      ]
    }
  },
  methods: {
    taskHelp () {
      swal('About Tasks', 'Tasks are things that analyst must complete, they can be issues that need to be fixed, actions to take, etc. Tasks may have subtasks and findings, as well as priority level. ', 'info'
      )
    },
    actionSample () {
      this.$buefy.toast.open({
        message: 'Feed has been refreshed',
        type: 'is-info',
        queue: false
      })
    },
    async getTaskData () {
      TaskService.getTasks()
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'tasks', response.data)
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    }
  }
}
</script>
