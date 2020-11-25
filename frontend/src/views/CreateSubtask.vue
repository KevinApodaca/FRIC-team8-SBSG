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
        <card-component :title="formCardTitle" icon="view-list" class="tile is-child">
          <form @submit.prevent="submit">
             <b-field label="Title" horizontal>
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="Description" horizontal required>
              <b-input type="textarea" v-model="form.description" reaadonly />
            </b-field>
            <b-field label="Progress" horizontal>
              <b-select v-model="form.subtask_progress">
                <option v-for="(subtask_progress, index) in subtask_progress" :key="index" :value="subtask_progress">
                  {{ subtask_progress }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Due Date" horizontal required>
              <b-datepicker icon="calendar-today" placeholder="Select Date..." v-model="form.due_date"></b-datepicker>
            </b-field>
            <card-component title="Attachments" icon="cloud-upload"><file-picker-drag-and-drop :file-export='files'/></card-component>
            <b-field label="Analyst(s)" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
            <b-field label="Collaborator(s)" horizontal>
              <b-select v-model="form.collaborator">
                <option v-for="(collaborator, index) in collaborator" :key="index" :value="collaborator">
                  {{ collaborator }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Task(s)" horizontal required>
              <b-select v-model="form.tasks">
                <option v-for="(tasks, index) in tasks" :key="index" :value="tasks">
                  {{ tasks }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Subtask(s)" horizontal>
              <b-select v-model="form.subtasks">
                <option v-for="(subtasks, index) in task" :key="index" :value="subtasks">
                  {{ subtasks }}
                </option>
              </b-select>
            </b-field>
            </b-field>
          </form>
        </card-component>
      </tiles>
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <router-link to='/subtasks'>
              <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
            </router-link>
          </div>
          <div class="control">
            <router-link slot="right" to="/subtasks" class="button is-primary is-outlined">
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
import SubtaskService from '@/services/SubtaskServices'
import LogServices from '@/services/LogTransactionServices'
import CardComponent from '@/components/CardComponent'
import FilePickerDragAndDrop from '@/components/FilePickerDragAndDrop'

export default {
  name: 'SubtaskForm',
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
      tasks: null,
      files: [],
      subtask_progress: [
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
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.subtasks.name
      } else {
        lastCrumb = 'New Subtask'
      }

      return [
        'Analyst',
        'Subtasks',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Create Subtask'
      }
    },
    heroRouterLinkTo () {
      return '/subtasks'
    },
    heroRouterLinkLabel () {
      return 'Back'
    },
    formCardTitle () {
      return 'New Subtask'
    }
  },
  created () {
    this.getTasks()
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

      SubtaskService.createSubtask(this.form)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async getTasks () {
      TaskService.getTasks()
        .then(response => {
          this.tasks = response.data.map(task => task.title)
        })
    },
    async logAction () {
      LogServices.logCreatedSubtask(this.form.title)
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
