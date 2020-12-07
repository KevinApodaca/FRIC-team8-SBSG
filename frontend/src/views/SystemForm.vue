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
        <card-component :title="formCardTitle" icon="state-machine" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="System Name" horizontal>
              <b-input v-model="form.name" required />
            </b-field>
            <b-field label="System Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
            <b-field label="System Location" horizontal>
              <b-input v-model="form.location" reaadonly />
            </b-field>
            <b-field label="System Router" horizontal>
              <b-input v-model="form.router" required />
            </b-field>
            <b-field label="System Switch" horizontal>
              <b-input v-model="form.switches" required />
            </b-field>
           <b-field label="System Room" horizontal>
              <b-input v-model="form.room" required />
            </b-field>
           <b-field label="Test Plan" horizontal>
              <b-input v-model="form.plan" required />
            </b-field>
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
          <b-field label="Confidentiality" horizontal>
               <b-select v-model="form.system_confidentiality">
                <option v-for="(system_confidentiality, index) in system_confidentialities" :key="index" :value="system_confidentiality">
                  {{ system_confidentiality }}
                </option>
              </b-select>
          <b-field label="Integrity" horizontal>
              <b-select v-model="form.system_integrity">
                <option v-for="(system_integrity, index) in system_integrities" :key="index" :value="system_integrity">
                  {{ system_integrity }}
                </option>
              </b-select>
            </b-field>
             <b-field label="Availability" horizontal>
              <b-select v-model="form.system_availability">
                <option v-for="(system_availability, index) in system_availabilities" :key="index" :value="system_availability">
                  {{ system_availability }}
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
            <router-link to='/systems'>
              <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
            </router-link>
          </div>
          <div class="control">
            <router-link slot="right" to="/systems" class="button is-primary is-outlined">
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
import CardComponent from '@/components/CardComponent'
import SystemService from '@/services/SystemServices'
import TaskService from '@/services/TaskServices'
import LogServices from '@/services/LogTransactionServices'

export default {
  name: 'SystemForm',
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
      system_confidentiality: null,
      system_integrity: null,
      system_availability: null,
      tasks: [],
      system_confidentialities: [
        'Low',
        'Medium',
        'High',
        'Information'
      ],
      system_integrities: [
        'Low',
        'Medium',
        'High',
        'Information'
      ],
      system_availabilities: [
        'Low',
        'Medium',
        'High',
        'Information'
      ]
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'New System'
      }

      return [
        'Analyst',
        'System',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Create System'
      }
    },
    heroRouterLinkTo () {
      return '/systems'
    },
    heroRouterLinkLabel () {
      return 'Back'
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'System Information'
      } else {
        return 'New System'
      }
    }
  },
  async created () {
    await this.getOldData()
    await this.getData()
    await this.getRelatedTasks()
  },
  methods: {
    async submit () {
      this.isLoading = true
      await this.checkIfNewTitleChanged()
      await this.newSystemForm()
    },
    async newSystemForm () {
      await SystemService.modifySystem(this.id, this.form)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
        .catch(e => { this.displayError(e) })
    },
    async getOldData () {
      if (this.id) {
        await SystemService.getSystemSingle(this.id)
          .then(response => {
            if (response.status === 200) {
              this.oldForm = response.data
            }
          })
          .catch(e => { this.displayError(e) })
      }
    },
    async getData () {
      if (this.id) {
        await SystemService.getSystemSingle(this.id)
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
    async getRelatedTasks () {
      TaskService.getTasks()
        .then(response => {
          this.tasks = response.data
        })
    },
    async checkIfNewTitleChanged () {
      if (this.form.name !== this.oldForm.name) {
        await this.tasks.map(this.changeTitleInTask)
      }
    },
    async changeTitleInTask (task) {
      if (task.systems_for_task === this.oldForm.name) {
        const newTitle = { systems_for_task: this.form.name }
        await TaskService.modifyTask(task.id, newTitle)
          .catch(e => { this.displayError(e) })
      }
    },
    async logAction () {
      await LogServices.logChangesFromSystem(this.oldForm, this.form)
        .then(response => {})
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
