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
          </form>
        </card-component>
        <card-component v-if="isProfileExists" title="System Categorization" icon="lightbulb-group" class="tile is-child">
          <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
          <b-field label="Confidentiality" horizontal>
               <b-select v-model="form.system_confidentiality">
                <option v-for="(system_confidentiality, index) in system_confidentialities" :key="index" :value="system_confidentiality">
                  {{ system_confidentiality }}
                </option>
              </b-select>
            </b-field>
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
import dayjs from 'dayjs'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import SystemService from '@/services/SystemServices'
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
      form: this.getClearFormObject(),
      oldForm: null,
      createdReadable: null,
      isProfileExists: false,
      system_confidentiality: null,
      system_integrity: null,
      system_availability: null,
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
  created () {
    this.getOldData()
    this.getData()
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
        SystemService.getSystemSingle(this.id)
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
        SystemService.getSystemSingle(this.id)
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
      SystemService.modifySystem(this.form, this.id)
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
                      'properties on system ' + this.oldForm.name
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
