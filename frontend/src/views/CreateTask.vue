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
            <b-field label="Title" horizontal >
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
            <b-field label="System(s)" horizontal>
              <b-select v-model="form.systems_for_task">
                <option v-for="(systems_for_task, index) in systems_for_task" :key="index" :value="systems_for_task">
                  {{ systems_for_task }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Priority" horizontal>
              <b-select v-model="form.task_priority">
                <option v-for="(task_priority, index) in task_priority" :key="index" :value="task_priority">
                  {{ task_priority }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Progress" horizontal>
              <b-select v-model="form.task_progress">
                <option v-for="(task_progress, index) in task_progress" :key="index" :value="task_progress">
                  {{ task_progress }}
                </option>
              </b-select>
            </b-field>
            <card-component title="Attachments" icon="cloud-upload"><file-picker-drag-and-drop :file-export='files'/></card-component>
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
           <b-field label="Due Date" horizontal>
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
import FileServices from '@/services/FileServices'
import SystemService from '@/services/SystemServices'
import AnalystService from '@/services/AnalystServices'
import CardComponent from '@/components/CardComponent'
import LogServices from '@/services/LogTransactionServices'
import FilePickerDragAndDrop from '@/components/FilePickerDragAndDrop'

export default {
  name: 'TaskForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar, FilePickerDragAndDrop },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: {},
      createdReadable: null,
      isProfileExists: false,
      systems_for_task: null,
      related_tasks: null,
      analysts_for_task: null,
      files: [],
      task_priority: [
        'Low',
        'Medium',
        'High'
      ],
      task_progress: [
        'Not Started',
        'Assigned',
        'Transferred',
        'In Progress',
        'Complete',
        'Not Applicable'
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
      if (this.isProfileExists) {
        return { name: 'tasks.new' }
      } else {
        return '/tasks'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New Task'
      } else {
        return 'Back'
      }
    },
    formCardTitle () {
      return 'New Task'
    }
  },
  created () {
    this.getSystems()
    this.getRelatedTasks()
    this.getAnalysts()
  },
  methods: {
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    async submit () {
      this.isLoading = true
      console.log(this.files)
      await FileServices.upLoadFiles(this.files)
        .then(res => {
          console.log(res)
          this.form.filename = res
        })
        .catch(err => {
          this.displayError(err)
        })

      await TaskService.createTask(this.form)
        .then(response => {
          if (response.status === 200) {
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
      LogServices.logCreatedTask(this.form.title)
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
