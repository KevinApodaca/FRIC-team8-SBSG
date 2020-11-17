<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="playlist-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="Title" horizontal>
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
              <b-field label="Analyst(s)" horizontal>
              <b-select v-model="form.analysts_for_task">
                <option v-for="(analysts_for_task, index) in analysts_for_task" :key="index" :value="analysts_for_task">
                  {{ analysts_for_task }}
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
              <b-select v-model="form.related_tasks">
                <option v-for="(related_tasks, index) in related_tasks" :key="index" :value="related_tasks">
                  {{ related_tasks }}
                </option>
              </b-select>
            </b-field>
            </b-field>
            <b-field label="Systems" horizontal>
              <b-select v-model="form.systems_for_task">
                <option v-for="(systems_for_task, index) in systems_for_task" :key="index" :value="systems_for_task">
                  {{ systems_for_task }}
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
            <b-field label="No. of Subtask" horizontal>
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
           <b-field label="Due Date" horizontal>
              <b-input v-model="form.created" onfocus="(this.type='date')" id="date" required />
            </b-field>
          </form>
        </card-component>
      </tiles>
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <router-link to='/tasks'>
              <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
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
import SystemService from '@/services/SystemServices'
import AnalystService from '@/services/AnalystServices'
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
      form: {},
      oldForm: null,
      createdReadable: null,
      isProfileExists: false,
      systems_for_task: null,
      related_tasks: null,
      analysts_for_task: null,
      task_priority: null,
      task_progress: null,
      task_priorities: [
        'Low',
        'Medium',
        'High'
      ],
      task_progresses: [
        'Not Started',
        'Transferred',
        'In Progress',
        'Complete',
        'Not Applicable'
      ]
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.title
      } else {
        lastCrumb = 'New Task'
      }

      return [
        'Analyst',
        'Task',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.title
      } else {
        return 'Task Detailed View'
      }
    },
    heroRouterLinkTo () {
      return '/tasks'
    },
    heroRouterLinkLabel () {
      return 'Back'
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Task Information'
      } else {
        return 'New Task'
      }
    }
  },
  created () {
    this.getData()
    this.getOldData()
    this.getSystems()
    this.getRelatedTasks()
    this.getAnalysts()
  },
  methods: {
    async getOldData () {
      if (this.id) {
        TaskService.getTaskSingle(this.id)
          .then(response => {
            this.oldForm = response.data
          })
          .catch(e => {
            this.displayError(e)
          })
      }
    },
    async getData () {
      if (this.id) {
        TaskService.getTaskSingle(this.id)
          .then(response => {
            if (response.status === 200) {
              this.isProfileExists = true
              this.$set(this, 'form', response.data)
            }
          })
          .catch(e => {
            this.displayError(e)
          })
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      this.isLoading = true
      console.log(this.id)
      TaskService.modifyTask(this.form, this.id)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully made changes')
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async getSystems () {
      SystemService.getSystems()
        .then(response => {
          this.systems_for_task = response.data.map(system => system.name)
        })
    },
    async getRelatedTasks () {
      TaskService.getTasks()
        .then(response => {
          this.related_tasks = response.data.map(task => task.title)
        })
    },
    async getAnalysts () {
      AnalystService.getAnalysts()
        .then(response => {
          this.analysts_for_task = response.data.map(analyst => analyst.initials)
        })
    },
    async logAction () {
      const changes = this.showDiffs()
      var trans = {
        initials: 'K.A',
        action: changes
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
    showDiffs () {
      var changes = 'K.A made the following changes to ' +
                      'properties on task ' + this.oldForm.title
      for (const property in this.form) {
        if (this.form[property] !== this.oldForm[property]) {
          changes += '\n ' + property + ': from ' + this.oldForm[property] +
                      ' to ' + this.form[property]
        }
      }
      return changes
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  }
}
</script>
