<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
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
        <card-component title="System Categorization" icon="lightbulb-group" class="tile is-child">
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
            <router-link to="/systems">
              <b-button native-type="submit" type="is-primary" @click="submit">Save</b-button>
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
  name: 'CreateSystem',
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
      createdReadable: null,
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
      return [
        'Analyst',
        'System',
        'New System'
      ]
    },
    heroTitle () {
      return 'Create System'
    },
    heroRouterLinkTo () {
      return '/'
    },
    heroRouterLinkLabel () {
      return 'Home'
    },
    formCardTitle () {
      return 'New System'
    }
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
      SystemService.createSystem(this.form)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully created system')
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
        action: 'K.A created system' + this.form.name
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
