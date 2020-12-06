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
            <b-field label="Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
            <b-field label="Progress" horizontal>
              <b-select v-model="form.subtask_progress">
                <option v-for="(subtask_progress, index) in subtask_progress" :key="index" :value="subtask_progress">
                  {{ subtask_progress }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Due Date" horizontal>
              <div style="width: 15rem;">
                <b-input v-model="form.due_date" reaadonly />
              </div>
            </b-field>
            <card-component title="Attachments" icon="cloud-upload"><file-picker-drag-and-drop/></card-component>
            <b-field label="Analyst(s)" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analysts_for_subtask, index) in analysts_for_subtask" :key="index" :value="analysts_for_subtask">
                  {{ analysts_for_subtask }}
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
              <b-select v-model="form.task">
                <option v-for="(tasks, index) in tasks" :key="index" :value="tasks">
                  {{ tasks }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Subtask(s)" horizontal>
              <b-select v-model="form.subtask">
                <option v-for="(subtasks, index) in subtasks" :key="index" :value="subtasks">
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
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import SubtaskService from '@/services/SubtaskServices'
import TaskService from '@/services/TaskServices'
import AnalystService from '@/services/AnalystServices'
import CardComponent from '@/components/CardComponent'
import LogServices from '@/services/LogTransactionServices'
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
      oldForm: null,
      createdReadable: null,
      isProfileExists: false,
      tasks: null,
      subtasks: null,
      analysts_for_subtask: null,
      collaborator: null,
      files: [],
      allTasks: [],
      allSubTasks: [],
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
        lastCrumb = this.form.title
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
        return this.form.title
      } else {
        return 'Subtask Detailed View'
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
        return 'Subtask Information'
      } else {
        return 'New Subtask'
      }
    }
  },
  async created () {
    await this.getData()
    await this.getOldData()
    await this.getTasks()
    await this.getSubtasks()
    await this.getAnalysts()
  },
  methods: {
    async submit () {
      this.isLoading = true
      await this.newSubtaskForm()
      await this.addToTask()
      await this.addToSubtask()
    },
    async getOldData () {
      if (this.id) {
        await SubtaskService.getSubtaskSingle(this.id)
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
        await SubtaskService.getSubtaskSingle(this.id)
          .then(response => {
            if (response.status === 200) {
              this.isProfileExists = true
              this.$set(this, 'form', response.data)
            }
          })
          .catch(e => { this.displayError(e) })
      }
    },
    async newSubtaskForm () {
      await SubtaskService.modifySubtask(this.id, this.form)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
        .catch(e => { this.displayError(e) })
    },
    async addToTask () {
      if ((this.form.task !== this.oldForm.task) && this.form.task) {
        const oldTaskId = this.allTasks.filter(task => task.title === this.oldForm.task)[0].id
        const newTaskId = this.allTasks.filter(task => task.title === this.form.task)[0].id
        if (oldTaskId) {
          await TaskService.removeSubtask(oldTaskId, this.id)
            .catch(e => { this.displayError(e) })
        }
        await TaskService.addSubtask(newTaskId, this.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async addToSubtask () {
      if (this.form.subtask && (this.form.subtask !== this.form.title) && (this.form.subtask !== this.oldForm.subtask)) {
        const oldSubtaskAssociationId = this.allSubTasks.filter(subtask => subtask.title === this.oldForm.subtask)[0].id
        const newSubtaskAssociationId = this.allSubTasks.filter(subtask => subtask.title === this.form.subtask)[0].id

        if (oldSubtaskAssociationId) {
          await SubtaskService.removeSubtask(oldSubtaskAssociationId, this.id)
            .catch(e => { this.displayError(e) })
        }

        await SubtaskService.addSubtask(newSubtaskAssociationId, this.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async getTasks () {
      await TaskService.getTasks()
        .then(response => {
          this.allTasks = response.data
          this.tasks = response.data.map(task => task.title)
        })
    },
    async getSubtasks () {
      await SubtaskService.getSubtasks()
        .then(response => {
          this.allSubTasks = response.data
          this.subtasks = response.data.map(subtask => subtask.title)
        })
    },
    async getAnalysts () {
      await AnalystService.getAnalysts()
        .then(response => {
          this.analysts_for_subtask = response.data.map(analyst => analyst.initials)
          this.collaborator = response.data.map(analyst => analyst.initials)
        })
    },
    async logAction () {
      await LogServices.logChangesFromSubtask(this.oldForm, this.form)
        .then(response => {
          if (response.status === 200) {
          }
        })
        .catch(e => { this.displayError(e) })
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
