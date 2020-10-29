<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" to="/subtasks/" class="button">
        Cancel
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
            <b-select v-model="form.progress">
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
            <b-field label="Due Date" horizontal>
              <div style="width: 15rem;">
                <b-input v-model="form.due_date" reaadonly />
              </div>
            </b-field>
            <b-field label="Analyst" horizontal>
              <div style="width: 10rem;">
                <b-input v-model="form.analyst" required />
              </div>
            </b-field>
            <hr>
            <b-field label="Collaborator" horizontal>
              <div style="width: 10rem;">
                <b-input v-model="form.organization" required />
              </div>
            </b-field>
            <b-field label="Tasks" horizontal>
              <div style="width: 10rem;">
                <b-input v-model="form.task" required />
              </div>
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

export default {
  name: 'SubtaskForm',
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
        return 'Create Subtask'
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
        return 'New Subtask'
      } else {
        return 'Home'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Subtask Information'
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
