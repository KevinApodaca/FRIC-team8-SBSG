<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
       <router-link slot="right" to="/systems" class="button">
        Cancel
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
                <option v-for="(system_confidentiality, index) in system_confidentialities" :key="index" :value="system_confidentialities">
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
import axios from 'axios'
import dayjs from 'dayjs'
// import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'

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
      if (this.isProfileExists) {
        return { name: 'system.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New System'
      } else {
        return 'Home'
      }
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
    getData () {
      if (this.id) {
        axios
          .get('http://localhost:3000/systems/' + this.id)
          .then(r => {
            // const item = find(r.data.data, item => item.id === parseInt(this.id))
            const item = r.data
            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'system.new' })
            }
          })
          .catch(e => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      this.isLoading = true
      console.log(this.form)
      axios.patch('http://localhost:3000/systems/' + this.id, this.form)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.message)
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
