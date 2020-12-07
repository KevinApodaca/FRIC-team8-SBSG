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
              <b-select v-model="form.analyst">
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
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import SubtaskService from '@/services/SubtaskServices'
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
      allSystems: [],
      allTasks: [],
      allSubtasks: [],
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
  async created () {
    await this.getData()
    await this.getOldData()
    await this.getRelatedSystems()
    await this.getRelatedTasks()
    await this.getRelatedSubtasks()
    await this.getRelatedAnalysts()
  },
  methods: {
    async submit () {
      this.isLoading = true
      await this.addSystemAssociation()
      await this.addTaskAssociation()
      await this.checkIfNewTitleChanged()
      await this.newTaskForm()
      await this.logAction()
    },
    async getOldData () {
      if (this.id) {
        await TaskService.getTaskSingle(this.id)
          .then(response => { this.oldForm = response.data })
          .catch(e => { this.displayError(e) })
      }
    },
    async getData () {
      if (this.id) {
        await TaskService.getTaskSingle(this.id)
          .then(response => {
            if (response.status === 200) {
              this.isProfileExists = true
              this.$set(this, 'form', response.data)
            }
          })
          .catch(e => { this.displayError(e) })
      }
    },
    async newTaskForm () {
      await TaskService.modifyTask(this.id, this.form)
        .catch(e => { this.displayError(e) })
    },
    async addSystemAssociation () {
      if ((this.form.systems_for_task !== this.oldForm.systems_for_task) && this.form.systems_for_task) {
        const newSystemId = this.allSystems.find(this.newSystem)

        await this.removeOldSystemAssociation()

        await SystemService.addTask(newSystemId.id, this.id)
          .catch(e => { this.displayError(e) })
      } else {
        this.form.systems_for_task = this.oldForm.systems_for_task
      }
    },
    async addTaskAssociation () {
      const isNotItself = this.form.related_tasks !== this.form.title
      const isNotSameParent = this.form.related_tasks !== this.oldForm.related_tasks
      const isNotEmpty = this.form.related_tasks !== ''

      if (isNotEmpty && isNotItself && isNotSameParent) {
        const newTaskAssociated = this.allTasks.find(this.newTask)

        await this.removeOldTaskAssociation()

        await TaskService.addTask(newTaskAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      } else {
        this.form.related_tasks = this.oldForm.related_tasks
      }
    },
    async removeOldSystemAssociation () {
      const oldSystemId = this.allSystems.find(this.oldSystemExist)

      if (oldSystemId !== undefined) {
        await SystemService.removeTask(oldSystemId.id, this.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async removeOldTaskAssociation () {
      const oldTaskAssociated = this.allTasks.find(this.oldTaskExist)

      if (oldTaskAssociated !== undefined) {
        await TaskService.removeTask(oldTaskAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async getRelatedSystems () {
      await SystemService.getSystems()
        .then(response => {
          this.allSystems = response.data
          this.systems_for_task = response.data.map(system => system.name)
        })
    },
    async getRelatedTasks () {
      await TaskService.getTasks()
        .then(response => {
          this.allTasks = response.data
          this.related_tasks = response.data.map(task => task.title)
        })
    },
    async getRelatedSubtasks () {
      await SubtaskService.getSubtasks()
        .then(response => {
          this.allSubtasks = response.data
        })
    },
    async getRelatedAnalysts () {
      await AnalystService.getAnalysts()
        .then(response => {
          this.analyst = response.data.map(analyst => analyst.initials)
          this.analysts_for_task = response.data.map(analyst => analyst.initials)
        })
    },
    async checkIfNewTitleChanged () {
      if (this.form.title !== this.oldForm.title) {
        await this.allTasks.map(this.changeTitleInTask)
        await this.allSubtasks.map(this.changeTitleInSubtask)
      }
    },
    async changeTitleInSubtask (subtask) {
      if (subtask.task === this.oldForm.title) {
        const newTitle = { task: this.form.title }
        await SubtaskService.modifySubtask(subtask.id, newTitle)
          .catch(e => { this.displayError(e) })
      }
    },
    async changeTitleInTask (task) {
      if (task.related_tasks === this.oldForm.title) {
        const newTitle = { related_tasks: this.form.title }
        await TaskService.modifyTask(task.id, newTitle)
          .catch(e => { this.displayError(e) })
      }
    },
    async logAction () {
      await LogServices.logChangesFromTask(this.oldForm, this.form)
        .catch(e => { this.displayError(e) })
    },
    oldTaskExist (task) {
      return task.title === this.oldForm.related_tasks
    },
    newTask (task) {
      return task.title === this.form.related_tasks
    },
    oldSystemExist (system) {
      return system.name === this.oldForm.systems_for_task
    },
    newSystem (system) {
      return system.name === this.form.systems_for_task
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
