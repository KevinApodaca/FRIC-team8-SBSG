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
                <option v-for="(subtask_progress, index) in subtask_progresses" :key="index" :value="subtask_progress">
                  {{ subtask_progress }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Due Date" horizontal required>
              <b-datepicker icon="calendar-today" placeholder="Select Date..." v-model="form.due_date"></b-datepicker>
            </b-field>
            <hr>
          </form>
        </card-component>
        <card-component title="Collaboration" icon="file-find" class="tile is-child">
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
            <hr>
            <card-component title="Attachments" icon="cloud-upload"><file-picker-drag-and-drop/></card-component>
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
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
      task_progress: null,
      task_progresses: [
        '1',
        '2'
      ]
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.subtasks.name
      } else {
        lastCrumb = 'Subtask View'
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
      if (this.isProfileExists) {
        return 'Subtask Detailed View'
      } else {
        return 'New Subtask'
      }
    }
  },
  created () {
    this.getData()
    this.getOldData()
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
      SubtaskService.createSubtask(this.form)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully created subtask')
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
        action: 'K.A created subtask ' + this.form.title
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
