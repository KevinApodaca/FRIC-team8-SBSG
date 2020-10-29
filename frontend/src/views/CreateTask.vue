<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="playlist-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="Title" horizontal >
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
              <b-field label="Analyst(s)" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
              <b-field label="Collaborator(s)" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Related Task(s)" horizontal>
              <b-select v-model="form.tasks">
                <option v-for="(tasks, index) in tasks" :key="index" :value="tasks">
                  {{ tasks }}
                </option>
              </b-select>
            </b-field>
            </b-field>
            <b-field label="System(s)" horizontal>
              <b-select v-model="form.system">
                <option v-for="(system, index) in type" :key="index" :value="system">
                  {{ system }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Priority" horizontal>
              <b-select v-model="form.task_priority">
                <option v-for="(task_priority, index) in task_priorities" :key="index" :value="task_priority">
                  {{ task_priority }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Progress" horizontal>
              <b-select v-model="form.task_progress">
                <option v-for="(task_progress, index) in task_progresses" :key="index" :value="task_progresses">
                  {{ task_progress }}
                </option>
              </b-select>
            </b-field>
            <hr>
            <b-field label="No. of Subtasks" horizontal>
              <div style = "width: 5rem;">
              <b-input v-model="form.subtasks" required />
              </div>
            </b-field>
            <b-field label="No. of Findings" horizontal>
              <div style = "width: 5rem;">
              <b-input v-model="form.findings" required />
              </div>
            </b-field>
            <hr>
           <b-field label="Declassification Date" horizontal>
              <b-datepicker icon="calendar-today" placeholder="Select Date..." v-model="form.created"></b-datepicker>
            </b-field>
          </form>
        </card-component>
      </tiles>
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <router-link to='/tasks'>
            <b-button native-type="submit" type="is-primary" @click="submit">Save</b-button>
            </router-link>
          </div>
          <div class="control">
            <router-link slot="right" to="/tasks" class="button is-primary is-outlined">
             Cancel
            </router-link>
          </div>
        </b-field>
      </b-field>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import TaskService from '@/services/TaskServices'
import CardComponent from '@/components/CardComponent'
import LogServices from '@/services/LogTransactionServices'

export default {
  name: 'TaskForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
      task_priority: null,
      task_progress: null,
      task_priorities: [
        'Low',
        'Medium',
        'High'
      ],
      task_progresses: [
        'not started',
        'transferred',
        'in progress',
        'complete',
        'not applicable'
      ]
    }
  },
  computed: {
    titleStack () {
      return [
        'Analyst',
        'Task',
        'New Task'
      ]
    },
    heroTitle () {
      return 'Create Task'
    },
    heroRouterLinkTo () {
      return '/'
    },
    heroRouterLinkLabel () {
      return 'Home'
    },
    formCardTitle () {
      return 'New Task'
    }
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
        progress: 0
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    async submit () {
      this.isLoading = true
      TaskService.createTask(this.form)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully created task')
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async logAction () {
      var trans = {
        initals: 'K.A',
        action: 'K.A created task' + this.form.name
      }
      LogServices.logAction(trans)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully logged')
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
    }
  }
}
</script>
