<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Subtask Detailed View
      <router-link slot="right" to="/subtasks/" class="button">
        Back to Subtasks
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="slot-machine" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="Title" horizontal>
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
             <b-field label="Progress" horizontal>
            <b-select v-model="form.progress">
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
            <b-field label="Due Date" horizontal>
              <b-input v-model="form.due_date" reaadonly />
            </b-field>
            <b-field label="Analyst" horizontal>
              <b-input v-model="form.analyst" required />
            </b-field>
            <hr>
            <b-field label="Collaborator" horizontal>
              <b-input v-model="form.organization" required />
            </b-field>
            <b-field label="Tasks" horizontal>
              <b-input v-model="form.task" required />
            </b-field>
            <hr>
               <b-field label="Subtasks" horizontal>
            <b-select v-model="form.classification">
              <option v-for="(classification, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
           <b-field label="Attachments" horizontal>
              <b-input v-model="form.declassified_date" required />
            </b-field>
          </form>
        </card-component>
        <card-component v-if="isProfileExists" title="Event Team Information" icon="account-group" class="tile is-child">
          <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
          <b-field label="Lead Analysts">
            <div class="control">
                <b-button type="is-primary is-small is-outlined is-rounded" @click="add">+ Add Lead Analysts</b-button>
              </div>
          </b-field>
          <b-field label="Analysts">
            <div class="control">
                <b-button type="is-primary is-small is-outlined is-rounded" @click="add">+ Add Analysts</b-button>
              </div>
          </b-field>
          <analysts-table data-url="/data-sources/clients.json" :checkable="true"/>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import SubtaskService from '@/services/SubtaskServices'
import CardComponent from '@/components/CardComponent'
import LogServices from '@/services/LogTransactionServices'
import AnalystsTable from '@/components/AnalystsTable'

export default {
  name: 'SubtaskForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar, AnalystsTable },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      oldForm: null,
      createdReadable: null,
      isProfileExists: false
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
        return 'Create Event'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'subtask.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New Event'
      } else {
        return 'Home'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Subtask Information'
      } else {
        return 'New Event'
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
    async getOldData () {
      if (this.id) {
        SubtaskService.getSubtaskSingle(this.id)
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
        SubtaskService.getSubtaskSingle(this.id)
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
      SubtaskService.modifySubtask(this.form, this.id)
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
    async logAction () {
      const changes = this.compareForms()
      var trans = {
        initial: 'K.A',
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
                      'properties on subtask ' + this.oldForm.name
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
